// Write a single-sheet Open XML workbook using an uncompressed ZIP container.
const ExcelExport = (() => {
  const encoder = new TextEncoder();
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const spreadsheet = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  const office = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const packaging = 'http://schemas.openxmlformats.org/package/2006';
  const escapeXml = value => String(value).replace(/[&<>]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;'
  })[char]);

  function crc32(bytes) {
    let crc = -1;
    for (const byte of bytes) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit++) {
        crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function zip(files) {
    const local = [];
    const directory = [];
    let offset = 0;
    let directorySize = 0;

    for (const [path, content] of Object.entries(files)) {
      const name = encoder.encode(path);
      const bytes = encoder.encode(xmlHeader + content);
      const checksum = crc32(bytes);
      const entry = new Uint8Array(30);
      const header = new DataView(entry.buffer);
      header.setUint32(0, 0x04034b50, true);
      header.setUint16(4, 20, true);
      header.setUint16(12, 33, true); // DOS date for 1980-01-01.
      header.setUint32(14, checksum, true);
      header.setUint32(18, bytes.length, true);
      header.setUint32(22, bytes.length, true);
      header.setUint16(26, name.length, true);

      const record = new Uint8Array(46);
      const central = new DataView(record.buffer);
      central.setUint32(0, 0x02014b50, true);
      central.setUint16(4, 20, true);
      record.set(entry.subarray(4, 30), 6);
      central.setUint32(42, offset, true);
      local.push(entry, name, bytes);
      directory.push(record, name);
      offset += entry.length + name.length + bytes.length;
      directorySize += record.length + name.length;
    }

    const end = new Uint8Array(22);
    const footer = new DataView(end.buffer);
    footer.setUint32(0, 0x06054b50, true);
    footer.setUint16(8, directory.length / 2, true);
    footer.setUint16(10, directory.length / 2, true);
    footer.setUint32(12, directorySize, true);
    footer.setUint32(16, offset, true);
    return new Blob([...local, ...directory, end], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  }

  function workbook(rows) {
    const sheet = rows.map((row, index) => {
      const cells = row.map(value => {
        if (value == null) return '<c/>';
        if (Number.isFinite(value)) return '<c><v>' + value + '</v></c>';
        return '<c t="inlineStr"><is><t xml:space="preserve">' +
          escapeXml(value) + '</t></is></c>';
      });
      return '<row r="' + (index + 1) + '">' + cells.join('') + '</row>';
    }).join('');

    return zip({
      '[Content_Types].xml': '<Types xmlns="' + packaging + '/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
      '_rels/.rels': '<Relationships xmlns="' + packaging + '/relationships"><Relationship Id="rId1" Type="' +
        office + '/officeDocument" Target="xl/workbook.xml"/></Relationships>',
      'xl/workbook.xml': '<workbook xmlns="' + spreadsheet + '" xmlns:r="' + office +
        '"><sheets><sheet name="ទិន្នន័យ" sheetId="1" r:id="rId1"/></sheets></workbook>',
      'xl/_rels/workbook.xml.rels': '<Relationships xmlns="' + packaging +
        '/relationships"><Relationship Id="rId1" Type="' + office +
        '/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
      'xl/worksheets/sheet1.xml': '<worksheet xmlns="' + spreadsheet +
        '"><cols><col min="1" max="8" width="24" customWidth="1"/></cols><sheetData>' +
        sheet + '</sheetData></worksheet>'
    });
  }

  function download(filename, rows) {
    const url = URL.createObjectURL(workbook(rows));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.xlsx';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return { download };
})();

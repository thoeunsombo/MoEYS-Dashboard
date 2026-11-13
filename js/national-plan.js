const indicators = [
  { id: 'age-five', label: 'អត្រាចូលរៀនកុមារអាយុ៥ឆ្នាំ', unit: '%', values: [64.8,71.4,77.9], targetGaps: [6,11.1] },
  { id: 'primary', label: 'អត្រាពិតនៃការសិក្សានៅបឋមសិក្សា', unit: '%', values: [99.6,102.3,101.6], targetGaps: [6.1,5] },
  { id: 'lower-secondary', label: 'អត្រារួមនៃការសិក្សានៅមធ្យមសិក្សាបឋមភូមិ', unit: '%', values: [74.7,75.2,79], targetGaps: [0,3.5] },
  { id: 'upper-secondary', label: 'អត្រារួមនៃការសិក្សានៅមធ្យមសិក្សាទុតិយភូមិ', unit: '%', values: [44.2,44.3,46.6], targetGaps: [0,1.8] },
  { id: 'higher-education', label: 'អត្រារួមនៃការសិក្សានៅឧត្តមសិក្សា (១៨–២២ ឆ្នាំ)', unit: '%', values: [14.7,19.1,19], targetGaps: [0.2,-0.9] },
  { id: 'adult-literacy', label: 'អត្រាអក្ខរកម្មជនពេញវ័យ (១៥ ឆ្នាំឡើង)', unit: '%', values: [84.7,85.5,85.5], targetGaps: [-1,-1.9] },
  { id: 'technical-students', label: 'ចំនួនសិស្សនៅមធ្យមសិក្សាបច្ចេកទេស', unit: ' នាក់', values: [3512,3848,4717], targetGaps: [41,362] },
  { id: 'digital-students', label: 'ចំនួននិស្សិតជំនាញបច្ចេកវិទ្យាឌីជីថល', unit: ' នាក់', values: [737,1009,1271], targetGaps: [232,454] },
  { id: 'medals', label: 'ចំនួនមេដាយពីការប្រកួតកម្រិតតំបន់ និងអន្តរជាតិ', unit: ' មេដាយ', values: [100,237,214], targetGaps: [133,110] },
  { id: 'model-schools', label: 'ចំនួនសាលារៀនគំរូ', unit: ' សាលា', values: [120,264,461], targetGaps: [14,101] },
];
const years = [2023, 2024, 2025];
const params = new URLSearchParams(location.search);
const selected = indicators.find(item => item.id === params.get('indicator'));
const yearSelect = document.getElementById('nationalYear');
const results = document.getElementById('nationalResults');
const number = new Intl.NumberFormat('km-KH-u-nu-khmr', { maximumFractionDigits: 2 });
const missing = 'មិនទាន់មានទិន្នន័យ';

if ([...yearSelect.options].some(option => option.value === params.get('year'))) {
  yearSelect.value = params.get('year');
}
const current = document.querySelector('[data-indicator="' + (selected?.id ?? 'overview') + '"]');
current.setAttribute('aria-current', 'page');
current.classList.add('active');
if (selected) {
  document.getElementById('nationalTitle').textContent = selected.label;
  document.title = selected.label + ' | MoEYS';
}

function display(value, unit) {
  return value == null ? missing : number.format(value) + unit;
}


const icons = ['fa-child-reaching', 'fa-school', 'fa-book-open', 'fa-graduation-cap',
  'fa-building-columns', 'fa-book', 'fa-screwdriver-wrench', 'fa-laptop-code', 'fa-medal', 'fa-star'];
const yearFormat = new Intl.NumberFormat('km-KH-u-nu-khmr', { useGrouping: false });

function renderCard(item, year, index) {
  const value = item.values[index];
  const gap = item.targetGaps[index - 1];
  const percent = item.unit === '%';
  const changeClass = gap > 0 ? 'above' : gap < 0 ? 'below' : 'neutral';
  const comparison = gap == null ? '' : '<p class="national-gap ' + changeClass + '">' +
    '<strong>' + (gap > 0 ? '+' : '') + display(gap, item.unit) + '</strong> ធៀបនឹងគោលដៅ</p>';
  return '<a class="national-card ' + (percent ? 'rate' : 'count') + '" href="?indicator=' + item.id + '&amp;year=' + year + '">' +
    '<span class="national-icon" aria-hidden="true"><i class="fa-solid ' + icons[indicators.indexOf(item)] + '"></i></span>' +
    '<h3>' + item.label + '</h3><strong class="national-value' + (value == null ? ' missing' : '') + '">' +
    display(value, item.unit) + '</strong>' + comparison +
    '<i class="national-arrow fa-solid fa-arrow-right" aria-hidden="true"></i></a>';
}

function renderDetail(item, year, index) {
  const value = item.values[index];
  const previous = item.values[index - 1];
  const gap = item.targetGaps[index - 1];
  const change = value == null || previous == null ? null : value - previous;
  const delta = (amount, unit) => (amount > 0 ? '+' : '') + display(amount, unit);
  const metrics = [
    ['លទ្ធផលឆ្នាំ ' + yearFormat.format(year), display(value, item.unit), 'fa-chart-column'],
    ['ប្រែប្រួលធៀបនឹងឆ្នាំមុន', delta(change, item.unit === '%' ? ' ពិន្ទុភាគរយ' : item.unit), 'fa-arrows-up-down'],
    ['ធៀបនឹងគោលដៅ', delta(gap, item.unit), 'fa-bullseye']
  ];
  const metricCards = metrics.map(([label, text, icon]) =>
    '<article class="national-card rate"><span class="national-icon" aria-hidden="true"><i class="fa-solid ' + icon +
    '"></i></span><h3>' + label + '</h3><strong class="national-value' +
    (text === missing ? ' missing' : '') + '">' + text + '</strong></article>').join('');
  const max = Math.max(...item.values);
  const bars = item.values.map((result, i) =>
    '<div class="national-bar-column' + (years[i] === year ? ' is-selected' : '') + '">' +
    '<strong>' + display(result, item.unit) + '</strong><div class="national-bar-track"><span style="--bar-size:' +
    (result / max * 100) + '%"></span></div><span>' + yearFormat.format(years[i]) + '</span></div>').join('');
  const rows = [...yearSelect.options].map(option => {
    const rowYear = Number(option.value);
    return '<tr' + (rowYear === year ? ' class="current-year"' : '') + '><th scope="row">' +
      yearFormat.format(rowYear) + '</th><td>' + display(item.values[years.indexOf(rowYear)], item.unit) + '</td></tr>';
  }).join('');
  return '<div class="national-cards national-metrics">' + metricCards + '</div>' +
    '<div class="national-detail-grid"><section class="detail-panel national-chart"><header><h2>និន្នាការតាមឆ្នាំ</h2>' +
    '<p>ឆ្នាំដែលមានទិន្នន័យ</p></header><div class="national-bars" aria-hidden="true">' + bars + '</div></section>' +
    '<section class="detail-panel national-history"><header><h2>តារាងលទ្ធផលតាមឆ្នាំ</h2></header>' +
    '<table><thead><tr><th scope="col">ឆ្នាំ</th><th scope="col">លទ្ធផល</th></tr></thead><tbody>' +
    rows + '</tbody></table></section></div>';
}

function renderNationalPlan() {
  const year = Number(yearSelect.value);
  const index = years.indexOf(year);

  const entries = selected ? years.map((reportYear, i) => ({
    label: yearFormat.format(reportYear), value: selected.values[i], selected: reportYear === year
  })) : indicators.filter(item => item.unit === '%' && item.values[index] != null).map(item => ({
    label: item.label, value: item.values[index]
  }));
  document.getElementById('extraCharts').innerHTML = entries.length ? DashboardCharts.bars(
    selected ? 'ប្រៀបធៀបលទ្ធផលតាមឆ្នាំ' : 'ប្រៀបធៀបសូចនាករគិតជាភាគរយ',
    entries, value => display(value, selected?.unit ?? '%'),
    { subtitle: selected ? 'ឆ្នាំដែលមានទិន្នន័យ' : yearFormat.format(year),
      max: !selected || selected.unit === '%' ? Math.max(100, ...entries.map(entry => entry.value)) : undefined }
  ) : '';
  document.querySelectorAll('[data-indicator]').forEach(link => {
    const query = new URLSearchParams({ year });
    if (link.dataset.indicator !== 'overview') query.set('indicator', link.dataset.indicator);
    link.href = '?' + query;
  });
  document.getElementById('nationalOverview').hidden = !selected;
  if (selected) document.getElementById('nationalOverview').href = '?year=' + year;
  if (selected) {
    results.innerHTML = renderDetail(selected, year, index);
    return;
  }

  const groups = [
    ['អត្រាចូលរៀន និងអក្ខរកម្ម', indicators.filter(item => item.unit === '%')],
    ['ចំនួនសិស្ស សាលារៀន និងមេដាយ', indicators.filter(item => item.unit !== '%')]
  ];
  results.innerHTML = groups.map(([label, items]) =>
    '<section class="national-group"><h2>' + label + '</h2><div class="national-cards">' +
    items.map(item => renderCard(item, year, index)).join('') + '</div></section>').join('');
}

yearSelect.addEventListener('change', () => {
  params.set('year', yearSelect.value);
  history.replaceState(null, '', '?' + params);
  renderNationalPlan();
});
const menu = document.getElementById('mobileMenu');
const mask = document.getElementById('sidebarMask');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
}
menu.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
mask.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    setMenu(false);
    menu.focus();
  }
});
renderNationalPlan();

document.getElementById('nationalExcel').addEventListener('click', () => {
  const year = Number(yearSelect.value);
  const items = selected ? [selected] : indicators;
  const exportYears = selected ? [...yearSelect.options].map(option => Number(option.value)) : [year];
  const rows = [['សូចនាករ', 'ឆ្នាំ', 'លទ្ធផល', 'ឯកតា', 'ធៀបនឹងគោលដៅ', 'ស្ថានភាព']];
  for (const item of items) {
    for (const exportYear of exportYears) {
      const index = years.indexOf(exportYear);
      const value = item.values[index];
      rows.push([item.label, exportYear, value, item.unit.trim(),
        item.targetGaps[index - 1], value == null ? missing : '']);
    }
  }
  const source = document.querySelector('.national-toolbar a[target="_blank"]').href;
  rows.push([], ['ប្រភព', source]);
  ExcelExport.download(selected ? 'moeys-' + selected.id + '-history' : 'moeys-national-plan-' + year, rows);
});

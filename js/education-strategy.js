const years = [2024, 2025, 2026, 2027, 2028];
const source = document.getElementById('strategySource').href;
const params = new URLSearchParams(location.search);
const program = Number(params.get('program'));
const chosen = Number.isInteger(program) && program >= 1 && program <= programs.length ? program : 0;
const yearSelect = document.getElementById('strategyYear');
const result = document.getElementById('strategyResults');
const chartType = document.getElementById('strategyChartType');
chartType.closest('label').hidden = !chosen;
const digits = new Intl.NumberFormat('km-KH', { maximumFractionDigits: 2 });
const missing = 'មិនទាន់មានទិន្នន័យដែលបានផ្ទៀងផ្ទាត់';
const programName = index => 'កម្មវិធីទី' + '១២៣៤៥'[index];
const indices = chosen ? [chosen - 1] : programs.map((_, index) => index);

if (years.includes(Number(params.get('year')))) yearSelect.value = params.get('year');
const activeLink = document.querySelector('[data-program="' + chosen + '"]');
activeLink.classList.add('active');
activeLink.setAttribute('aria-current', 'page');

function valuesFor(row, year) {
  if (year === 2024) return [row[2], row[4]];
  if (year === 2025) return [row[3], row[5]];
  return [null, null];
}

function format(value, unit) {
  if (value === null) return '—';
  return digits.format(value) + (unit === '%' ? '%' : unit ? ' ' + unit : '');
}


const observedYears = [2024, 2025];

function indicatorChart(row, selectedYear) {
  const unit = row[1];
  const values = observedYears.map(year => valuesFor(row, year)[0]);
  const ceiling = Math.max(...values, 0.01) * 1.18;
  const heights = values.map(value => value / ceiling * 100);
  const isLine = chartType.value === 'line';

  const points = observedYears.map((year, index) => {
    const label = format(values[index], unit);
    return `<div class="strategy-point${year === selectedYear ? ' is-current' : ''}">
      <div class="strategy-plot" style="--level:${heights[index]}%">
        <span class="strategy-mark"><strong>${label}</strong></span>
      </div>
      <span class="strategy-chart-year">${year}</span>
    </div>`;
  }).join('');
  const line = isLine
    ? `<svg class="strategy-connector" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M25 ${100 - heights[0]} L75 ${100 - heights[1]}" vector-effect="non-scaling-stroke"/>
      </svg>`
    : '';
  return `<div class="strategy-series ${isLine ? 'strategy-line' : 'strategy-columns'}">${line}${points}</div>`;
}

function targetChart(year) {
  const gaps = indices.flatMap(index => programs[index])
    .map(row => valuesFor(row, year)[1]).filter(gap => gap !== null);
  if (!gaps.length) return '';

  const above = gaps.filter(gap => gap > 0).length;
  const at = gaps.filter(gap => gap === 0).length;
  const below = gaps.length - above - at;
  const firstStop = above / gaps.length * 100;
  const secondStop = (above + at) / gaps.length * 100;
  return `<section class="detail-panel strategy-targets">
    <header><h2>ស្ថានភាពសូចនាករធៀបនឹងគោលដៅ · ${year}</h2></header>
    <div class="strategy-target-body">
      <div class="strategy-ring" aria-hidden="true" style="--first-stop:${firstStop}%;--second-stop:${secondStop}%">
        <strong>${gaps.length}</strong>
      </div>
      <ul class="strategy-legend">
        <li><i class="above" aria-hidden="true"></i><span>លើសគោលដៅ</span><strong>${above}</strong></li>
        <li><i class="at" aria-hidden="true"></i><span>ស្មើគោលដៅ</span><strong>${at}</strong></li>
        <li><i class="below" aria-hidden="true"></i><span>ក្រោមគោលដៅ</span><strong>${below}</strong></li>
      </ul>
    </div>
  </section>`;
}

function renderStrategy() {
  const year = Number(yearSelect.value);

  const groups = indices.map(index => ({
    label: programName(index),
    values: [1, 0, -1].map(sign => programs[index].filter(row => {
      const gap = valuesFor(row, year)[1];
      return gap !== null && Math.sign(gap) === sign;
    }).length)
  }));
  document.getElementById('extraCharts').innerHTML = groups.some(group => group.values.some(Boolean))
    ? DashboardCharts.stacked('សូចនាករធៀបនឹងគោលដៅតាមកម្មវិធី', groups,
      ['លើសគោលដៅ', 'ស្មើគោលដៅ', 'ក្រោមគោលដៅ'], value => digits.format(value), String(year))
    : '';
  document.querySelectorAll('[data-program]').forEach(link => {
    const query = new URLSearchParams({ year });
    if (link.dataset.program !== '0') query.set('program', link.dataset.program);
    link.href = '?' + query;
  });
  document.getElementById('strategyStatus').textContent = year > 2025 ? missing : '';
  DashboardCharts.sourceNote('strategyChartSource', year, source, chosen ? observedYears : []);
  result.innerHTML = targetChart(year) + indices.map(index => {
    const report = 'https://lookerstudio.google.com/reporting/' + programReports[index];
    const cards = programs[index].map((row, position) => {
      const [label, unit] = row;
      const [value, gap] = valuesFor(row, year);
      const tone = gap > 0 ? 'above' : gap < 0 ? 'below' : 'neutral';
      const comparison = gap === null ? '' : '<p class="national-gap ' + tone + '"><strong>' +
        (gap > 0 ? '+' : '') + format(gap, unit) + '</strong> ធៀបនឹងគោលដៅ</p>';
      const history = chosen ? indicatorChart(row, year) : "";
      return '<article class="national-card" id="indicator-' + (index + 1) + '-' + (position + 1) + '"><h3>' + label + '</h3><strong class="national-value">' +
        format(value, unit) + '</strong>' + comparison + history + '</article>';
    }).join('');
    return '<section class="national-group"><div class="strategy-group-header"><h2>' + programName(index) +
      '</h2><div class="strategy-links">' + (chosen ? '' : '<a href="?program=' + (index + 1) +
        '&amp;year=' + year + '">មើលតាមឆ្នាំ</a>') +
      '<a href="' + report + '" target="_blank" rel="noopener noreferrer">របាយការណ៍លម្អិត ↗</a></div></div>' +
      '<div class="national-cards strategy-cards">' + cards + '</div></section>';
  }).join('');
}

chartType.addEventListener('change', renderStrategy);
yearSelect.addEventListener('change', () => {
  params.set('year', yearSelect.value);
  history.replaceState(null, '', '?' + params);
  renderStrategy();
});

document.getElementById('strategyExcel').addEventListener('click', () => {
  const year = Number(yearSelect.value);
  const rows = [['កម្មវិធី', 'សូចនាករ', 'ឆ្នាំ', 'លទ្ធផល', 'ឯកតា', 'ធៀបនឹងគោលដៅ', 'ស្ថានភាព']];
  for (const index of indices) {
    for (const row of programs[index]) {
      for (const exportYear of chosen ? [2024, 2025] : [year]) {
        const [value, gap] = valuesFor(row, exportYear);
        rows.push([programName(index), row[0], exportYear, value, row[1], gap, value === null ? missing : '']);
      }
    }
  }
  rows.push([], ['ប្រភព', source]);
  ExcelExport.download(chosen ? 'moeys-' + reportSlug + '-program-' + chosen : 'moeys-' + reportSlug + '-' + year, rows);
});

const menu = document.getElementById('mobileMenu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
}
menu.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
document.getElementById('sidebarMask').addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    setMenu(false);
    menu.focus();
  }
});
renderStrategy();
const linkedCard = document.getElementById(location.hash.slice(1));
if (linkedCard?.classList.contains('national-card')) {
  requestAnimationFrame(() => linkedCard.scrollIntoView({ block: 'start' }));
}

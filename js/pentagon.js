const khmerNumber = (value) => String(value).replace(/\d/g, (digit) => '០១២៣៤៥៦៧៨៩'[digit]);

// Demo data. Replace these values with API / Google Sheets data later.
const indicators = {
  overview: {
    crumb: 'ទិដ្ឋភាពសរុប',
    title: 'សូចនាករសមិទ្ធកម្មគន្លឹះគាំទ្រយុទ្ធសាស្ត្របញ្ចកោណ ដំណាក់កាលទី១',
    description: 'ទិដ្ឋភាពសរុបនៃសូចនាករវិស័យអប់រំដែលគាំទ្រយុទ្ធសាស្ត្របញ្ចកោណ ដំណាក់កាលទី១។',
    caption: 'សង្ខេបលទ្ធផលតាមសូចនាករសំខាន់',
    scores: [
      { label: 'សូចនាករសម្រេចបាន', value: 82, unit: '%', icon: 'fa-circle-check', delta: 4.2, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សូចនាករកំពុងអនុវត្ត', value: 13, unit: '%', icon: 'fa-hourglass-half', delta: 1.6, note: 'តាមផែនការ' },
      { label: 'ការអនុវត្តថវិកា', value: 76.57, decimals: 2, unit: '%', icon: 'fa-coins', delta: 3.8, note: 'ធៀបនឹងគោលដៅ' }
    ],
    outcomes: [{ label: 'គោលដៅបានសម្រេច', value: 80, unit: '%', delta: 2.3 }, { label: 'អង្គភាពរាយការណ៍ទាន់ពេល', value: 94, unit: '%', delta: 1.5 }],
    completion: 82,
    quarters: [57, 68, 77, 82],
    details: [['សូចនាករសរុប', '៨៨', 'កើនឡើង ៥ សូចនាករ'], ['គោលដៅសម្រេចបាន', '៨០', 'សម្រេចបាន ៨២%'], ['របាយការណ៍ទាន់ពេល', '៩៤%', 'ទិន្នន័យបានបញ្ជាក់']]
  },
  pisa: {
    crumb: 'PISA',
    title: 'លទ្ធផលនៃកម្មវិធីរង្វាយតម្លៃសិស្សជាអន្តរជាតិ (PISA)',
    description: 'បង្ហាញលទ្ធផលសមត្ថភាពសិស្ស និងវឌ្ឍនភាពនៃការសិក្សាតាមស្តង់ដារអន្តរជាតិ។',
    caption: 'លទ្ធផលវាយតម្លៃ PISA',
    scores: [
      { label: 'អំណាន', value: 329, icon: 'fa-book-open', delta: 0, note: 'ធៀបនឹងគោលដៅ' },
      { label: 'គណិតវិទ្យា', value: 336, icon: 'fa-calculator', delta: -10, note: 'ធៀបនឹងគោលដៅ' },
      { label: 'វិទ្យាសាស្ត្រ', value: 347, icon: 'fa-flask', delta: -10, note: 'ធៀបនឹងគោលដៅ' }
    ],
    outcomes: [{ label: 'អត្រារួមមធ្យមសិក្សាបឋមភូមិ', value: 79, unit: '%', decimals: 2, delta: 2.3 }, { label: 'អត្រារួមមធ្យមសិក្សាទុតិយភូមិ', value: 46.6, unit: '%', decimals: 2, delta: 1 }],
    completion: 74,
    quarters: [49, 58, 67, 74],
    details: [['សិស្សចូលរួមវាយតម្លៃ', '៦,៩៨៤', 'គ្របដណ្តប់តាមផែនការ'], ['គោលដៅពិន្ទុអំណាន', '៣២៩', 'សម្រេចបាន ១០០%'], ['គម្លាតគណិតវិទ្យា', '-១០', 'ត្រូវការគាំទ្របន្ថែម']]
  },
  seaplm: {
    crumb: 'SEA-PLM',
    title: 'លទ្ធផលនៃកម្មវិធីរង្វាយតម្លៃលទ្ធផលសិក្សានៅតំបន់អាស៊ីអាគ្នេយ៍ (SEA-PLM)',
    description: 'បង្ហាញលទ្ធផលសិក្សារបស់សិស្សកម្ពុជាប្រៀបធៀបនឹងស្តង់ដារតំបន់អាស៊ីអាគ្នេយ៍។',
    caption: 'លទ្ធផលវាយតម្លៃ SEA-PLM',
    scores: [
      { label: 'អំណាន', value: 521, icon: 'fa-book-open', delta: 12, note: 'ធៀបនឹងវដ្តមុន' },
      { label: 'គណិតវិទ្យា', value: 512, icon: 'fa-calculator', delta: 8, note: 'ធៀបនឹងវដ្តមុន' },
      { label: 'ការសរសេរ', value: 518, icon: 'fa-pen-nib', delta: 11, note: 'ធៀបនឹងវដ្តមុន' }
    ],
    outcomes: [{ label: 'សិស្សសម្រេចកម្រិតមូលដ្ឋាន', value: 72, unit: '%', delta: 3.4 }, { label: 'សិស្សសម្រេចកម្រិតខ្ពស់', value: 18, unit: '%', delta: 2.2 }],
    completion: 86,
    quarters: [62, 71, 80, 86],
    details: [['សិស្សចូលរួមវាយតម្លៃ', '៥,២០០', 'តាមស្តង់ដារតំបន់'], ['សាលាចូលរួម', '២៤០', 'គ្របដណ្តប់ ២៥ ខេត្ត'], ['ពិន្ទុមធ្យមសរុប', '៥១៧', 'កើនឡើង ១០ ពិន្ទុ']]
  }
};

const colorOptions = [
  { color: 'var(--teal)', wash: 'var(--teal-soft)' },
  { color: 'var(--green)', wash: 'var(--green-soft)' },
  { color: 'var(--amber)', wash: 'var(--amber-soft)' }
];
const yearFactor = { 2025: 1, 2024: .96, 2023: .92, 2022: .89 };
const requestedIndicator = new URLSearchParams(location.search).get('indicator');
const selectedIndicator = Object.hasOwn(indicators, requestedIndicator) ? requestedIndicator : 'overview';
const assessment = selectedIndicator !== 'overview';
const currentLink = document.querySelector('[data-indicator=' + selectedIndicator + ']');
currentLink.classList.add('active');
currentLink.setAttribute('aria-current', 'page');

function formatValue(value, decimals = 0, unit = '') {
  return `${khmerNumber(Number(value).toFixed(decimals))}${unit}`;
}

function getDataForYear(indicator, year) {
  const factor = yearFactor[year];
  const base = indicators[indicator];
  const scale = (item) => ({ ...item, displayValue: item.value * factor });
  return {
    ...base,
    scores: base.scores.map(scale),
    outcomes: base.outcomes.map(scale),
    quarters: base.quarters.map((value) => Math.round(value * factor)),
    completion: Math.min(99, Math.round(base.completion * factor)),
    details: base.details
  };
}

function deltaMarkup(delta, note, unit = '%') {
  if (delta === 0) return `<span class="neutral"><i class="fa-solid fa-minus"></i> ០${unit} ${note}</span>`;
  const direction = delta > 0 ? 'up' : 'down';
  const icon = delta > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
  return `<span class="${direction}"><i class="fa-solid ${icon}"></i> ${delta > 0 ? '+' : ''}${khmerNumber(delta.toFixed(1))}${unit} ${note}</span>`;
}

function renderPage() {
  const year = document.getElementById('reportYear').value;
  const data = getDataForYear(selectedIndicator, year);
  const series = Object.keys(yearFactor).map(reportYear => {
    const annual = getDataForYear(selectedIndicator, reportYear);
    return assessment
      ? { label: khmerNumber(reportYear), value: annual.scores.reduce((sum, score) => sum + score.displayValue, 0) / annual.scores.length, selected: reportYear === year }
      : { label: khmerNumber(reportYear), value: annual.completion, selected: reportYear === year };
  });
  document.getElementById('extraCharts').innerHTML = DashboardCharts.bars(
    assessment ? 'មធ្យមភាគពិន្ទុនៃមុខវិជ្ជាដែលបង្ហាញ តាមឆ្នាំ' : 'កម្រិតសម្រេចបានតាមឆ្នាំ',
    series,
    value => formatValue(value, assessment ? 1 : 0, assessment ? ' ពិន្ទុ' : '%'),
    { subtitle: 'ទិន្នន័យគំរូ', max: assessment ? undefined : 100 }
  );
  const khmerYear = khmerNumber(year);

  document.getElementById('crumbTitle').textContent = data.crumb;
  document.getElementById('pageTitle').textContent = data.title;
  document.getElementById('pageDescription').textContent = data.description;
  document.getElementById('sectionCaption').textContent = data.caption;
  document.getElementById('trendLabel').textContent = `វឌ្ឍនភាពឆ្នាំ ${khmerYear}`;
  document.getElementById('outcomeYear').textContent = khmerYear;

  document.getElementById('scoreGrid').innerHTML = data.scores.map((score, index) => {
    const color = colorOptions[index % colorOptions.length];
    return `<article class="score-card" style="--score-color:${color.color};--score-wash:${color.wash};--delta-color:${score.delta < 0 ? 'var(--red)' : score.delta > 0 ? 'var(--green)' : 'var(--muted)'}">
      <span class="score-icon"><i class="fa-solid ${score.icon}"></i></span>
      <h2>${score.label}</h2>
      <strong>${formatValue(score.displayValue, score.decimals, score.unit || ' ពិន្ទុ')}</strong>
      <div class="score-delta">${deltaMarkup(score.delta, score.note, score.unit || ' ពិន្ទុ')}</div>
    </article>`;
  }).join('');

  const performance = document.querySelector('.performance-grid');
  performance.hidden = assessment;
  const details = document.querySelector('.detail-panel:not(#assessmentChart)');
  details.hidden = assessment;
  const assessmentChart = document.getElementById('assessmentChart');
  assessmentChart.hidden = !assessment;
  if (assessment) {
    const maxScore = Math.ceil(Math.max(...data.scores.map(score => score.displayValue)) / 100) * 100;
    document.getElementById('assessmentBars').innerHTML = data.scores.map(score => {
      return `<div class="assessment-row"><span>${score.label}</span><meter min="0" max="${maxScore}" value="${score.displayValue}" aria-label="${score.label}"></meter><strong>${formatValue(score.displayValue)} ពិន្ទុ</strong></div>`;
    }).join('');
    return;
  }

  document.getElementById('miniChart').innerHTML = data.quarters.map((value, index) => `<div class="bar-wrap"><div class="bar-area"><div class="bar-item" style="--height:${value}%" data-value="${khmerNumber(value)}%"></div></div><small>ត្រីមាសទី${khmerNumber(index + 1)}</small></div>`).join('');
  const average = Math.round(data.quarters.reduce((sum, value) => sum + value, 0) / data.quarters.length);
  document.getElementById('averageValue').textContent = `មធ្យមភាគ ${khmerNumber(average)}%`;

  const [left, right] = data.outcomes;
  document.getElementById('outcomeLeftLabel').textContent = left.label;
  document.getElementById('outcomeLeftValue').textContent = formatValue(left.displayValue, left.decimals, left.unit || '');
  document.getElementById('outcomeLeftTrend').className = left.delta >= 0 ? 'up' : 'down';
  document.getElementById('outcomeLeftTrend').textContent = `${left.delta >= 0 ? '↑' : '↓'} ${left.delta >= 0 ? '+' : ''}${khmerNumber(left.delta.toFixed(1))}% ធៀបនឹងឆ្នាំមុន`;
  document.getElementById('outcomeRightLabel').textContent = right.label;
  document.getElementById('outcomeRightValue').textContent = formatValue(right.displayValue, right.decimals, right.unit || '');
  document.getElementById('outcomeRightTrend').className = right.delta >= 0 ? 'up' : 'down';
  document.getElementById('outcomeRightTrend').textContent = `${right.delta >= 0 ? '↑' : '↓'} ${right.delta >= 0 ? '+' : ''}${khmerNumber(right.delta.toFixed(1))}% ធៀបនឹងឆ្នាំមុន`;
  document.getElementById('completionBar').style.width = `${data.completion}%`;
  document.getElementById('completionValue').textContent = `${khmerNumber(data.completion)}%`;

  document.getElementById('detailList').innerHTML = data.details.map(([label, value, note]) => `<div class="detail-item"><span>${label}</span><strong>${value}</strong><small><i class="fa-solid fa-circle-check"></i> ${note}</small></div>`).join('');
}

document.getElementById('reportYear').addEventListener('change', renderPage);
document.getElementById('mobileMenu').addEventListener('click', () => document.body.classList.add('menu-open'));
document.getElementById('sidebarMask').addEventListener('click', () => document.body.classList.remove('menu-open'));

renderPage();

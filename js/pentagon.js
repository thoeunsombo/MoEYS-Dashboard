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
  lowerEnrollment: {
    crumb: 'មធ្យមសិក្សាបឋមភូមិ',
    title: 'អត្រារួមនៃការសិក្សានៅ មធ្យមសិក្សាបឋមភូមិ',
    description: 'តាមដានសមធម៌នៃការចូលរៀននៅកម្រិតមធ្យមសិក្សាបឋមភូមិទូទាំងប្រទេស។',
    caption: 'លទ្ធផលអត្រារួមនៃការសិក្សា',
    scores: [
      { label: 'អត្រារួមសរុប', value: 79, unit: '%', decimals: 2, icon: 'fa-school', delta: 2.3, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សស្រី', value: 80.4, unit: '%', decimals: 2, icon: 'fa-person-dress', delta: 2.6, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សប្រុស', value: 77.7, unit: '%', decimals: 2, icon: 'fa-person', delta: 1.9, note: 'ធៀបនឹងឆ្នាំមុន' }
    ],
    outcomes: [{ label: 'គោលដៅប្រចាំឆ្នាំ', value: 80, unit: '%', delta: -1 }, { label: 'ខេត្តសម្រេចគោលដៅ', value: 18, unit: ' ខេត្ត', delta: 3 }],
    completion: 79,
    quarters: [69, 73, 77, 79],
    details: [['ចំនួនសិស្សសរុប', '៤២១,៦០០', 'កើនឡើង ១២,៨០០ នាក់'], ['សាលាមធ្យមសិក្សាបឋមភូមិ', '១,៥៣២', 'គ្របដណ្តប់ ២៥ រាជធានី-ខេត្ត'], ['គម្លាតយេនឌ័រ', '២.៧%', 'កំពុងបង្រួមគម្លាត']]
  },
  upperEnrollment: {
    crumb: 'មធ្យមសិក្សាទុតិយភូមិ',
    title: 'អត្រារួមនៃការសិក្សានៅ មធ្យមសិក្សាទុតិយភូមិ',
    description: 'បង្ហាញវឌ្ឍនភាពនៃការចូលរៀន និងការបន្តការសិក្សារបស់សិស្សមធ្យមសិក្សាទុតិយភូមិ។',
    caption: 'លទ្ធផលអត្រារួមនៃការសិក្សា',
    scores: [
      { label: 'អត្រារួមសរុប', value: 46.6, unit: '%', decimals: 2, icon: 'fa-building-columns', delta: 1, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សស្រី', value: 49.2, unit: '%', decimals: 2, icon: 'fa-person-dress', delta: 1.6, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សប្រុស', value: 44.1, unit: '%', decimals: 2, icon: 'fa-person', delta: .6, note: 'ធៀបនឹងឆ្នាំមុន' }
    ],
    outcomes: [{ label: 'គោលដៅប្រចាំឆ្នាំ', value: 48, unit: '%', delta: -1.4 }, { label: 'អត្រាបន្តទៅឧត្តមសិក្សា', value: 25.7, unit: '%', decimals: 1, delta: 1.2 }],
    completion: 72,
    quarters: [39, 42, 45, 47],
    details: [['ចំនួនសិស្សសរុប', '១៨៥,៤៧០', 'កើនឡើង ៤,២៩០ នាក់'], ['សាលាមធ្យមសិក្សាទុតិយភូមិ', '៤៥៩', 'គ្របដណ្តប់ទូទាំងប្រទេស'], ['អត្រាឆ្លងថ្នាក់', '៨៨.២%', 'កើនឡើង ១.៤%']]
  },
  lowerDropout: {
    crumb: 'បោះបង់ការសិក្សា បឋមភូមិ',
    title: 'អត្រាបោះបង់ការសិក្សា នៅមធ្យមសិក្សាបឋមភូមិ',
    description: 'តាមដានអត្រាបោះបង់ការសិក្សា ដើម្បីកំណត់តំបន់អាទិភាព និងគាំទ្រសិស្សឱ្យបន្តការសិក្សា។',
    caption: 'លទ្ធផលអត្រាបោះបង់ការសិក្សា',
    scores: [
      { label: 'អត្រាបោះបង់សរុប', value: 10.2, unit: '%', decimals: 1, icon: 'fa-arrow-right-from-bracket', delta: -1.3, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សស្រី', value: 9.1, unit: '%', decimals: 1, icon: 'fa-person-dress', delta: -1.4, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សប្រុស', value: 11.2, unit: '%', decimals: 1, icon: 'fa-person', delta: -1.1, note: 'ធៀបនឹងឆ្នាំមុន' }
    ],
    outcomes: [{ label: 'គោលដៅកាត់បន្ថយ', value: 9, unit: '%', delta: 1.2 }, { label: 'សិស្សបានតាមដាន', value: 85, unit: '%', delta: 4.8 }],
    completion: 77,
    quarters: [14, 12, 11, 10],
    details: [['សិស្សបោះបង់ការសិក្សា', '៣២,៤៤២', 'ថយចុះ ៣,៨១១ នាក់'], ['តំបន់អាទិភាព', '៨ ខេត្ត', 'ត្រូវការគាំទ្របន្ថែម'], ['ករណីតាមដានបាន', '៨៥%', 'កើនឡើង ៤.៨%']]
  },
  upperDropout: {
    crumb: 'បោះបង់ការសិក្សា ទុតិយភូមិ',
    title: 'អត្រាបោះបង់ការសិក្សា នៅមធ្យមសិក្សាទុតិយភូមិ',
    description: 'តាមដានអត្រាបោះបង់ការសិក្សានៅកម្រិតទុតិយភូមិ ដើម្បីគាំទ្រការបន្តការសិក្សា និងជំនាញ។',
    caption: 'លទ្ធផលអត្រាបោះបង់ការសិក្សា',
    scores: [
      { label: 'អត្រាបោះបង់សរុប', value: 14.8, unit: '%', decimals: 1, icon: 'fa-arrow-right-from-bracket', delta: -1.7, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សស្រី', value: 13.9, unit: '%', decimals: 1, icon: 'fa-person-dress', delta: -1.8, note: 'ធៀបនឹងឆ្នាំមុន' },
      { label: 'សិស្សប្រុស', value: 15.7, unit: '%', decimals: 1, icon: 'fa-person', delta: -1.5, note: 'ធៀបនឹងឆ្នាំមុន' }
    ],
    outcomes: [{ label: 'គោលដៅកាត់បន្ថយ', value: 13.5, unit: '%', decimals: 1, delta: 1.3 }, { label: 'សិស្សបន្តទៅ TVET', value: 19.2, unit: '%', decimals: 1, delta: 2.1 }],
    completion: 70,
    quarters: [19, 17, 16, 15],
    details: [['សិស្សបោះបង់ការសិក្សា', '២៧,៩៨០', 'ថយចុះ ៣,៣២០ នាក់'], ['កម្មវិធីគាំទ្រសិស្ស', '៣៨០', 'អនុវត្តនៅ ១៨ ខេត្ត'], ['សិស្សបន្ត TVET', '១៩.២%', 'កើនឡើង ២.១%']]
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
  { color: '#0a70d8', wash: '#e8f3ff' },
  { color: '#6d56d5', wash: '#f0edff' },
  { color: '#0ca461', wash: '#e6f8ee' }
];
const yearFactor = { 2025: 1, 2024: .96, 2023: .92, 2022: .89 };
let selectedIndicator = 'pisa';

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

function deltaMarkup(delta, note) {
  if (delta === 0) return `<span class="neutral"><i class="fa-solid fa-minus"></i> ០ ${note}</span>`;
  const direction = delta > 0 ? 'up' : 'down';
  const icon = delta > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
  return `<span class="${direction}"><i class="fa-solid ${icon}"></i> ${delta > 0 ? '+' : ''}${khmerNumber(delta.toFixed(1))}% ${note}</span>`;
}

function renderPage() {
  const year = document.getElementById('reportYear').value;
  const data = getDataForYear(selectedIndicator, year);
  const khmerYear = khmerNumber(year);

  document.getElementById('crumbTitle').textContent = data.crumb;
  document.getElementById('pageTitle').textContent = data.title;
  document.getElementById('pageDescription').textContent = data.description;
  document.getElementById('sectionCaption').textContent = data.caption;
  document.getElementById('trendLabel').textContent = `វឌ្ឍនភាពឆ្នាំ ${khmerYear}`;
  document.getElementById('outcomeYear').textContent = khmerYear;

  document.getElementById('scoreGrid').innerHTML = data.scores.map((score, index) => {
    const color = colorOptions[index % colorOptions.length];
    return `<article class="score-card" style="--score-color:${color.color};--score-wash:${color.wash};--delta-color:${score.delta < 0 ? '#e64b4b' : score.delta > 0 ? '#16894d' : '#4394ee'}">
      <span class="score-icon"><i class="fa-solid ${score.icon}"></i></span>
      <h2>${score.label}</h2>
      <strong>${formatValue(score.displayValue, score.decimals, score.unit || '')}</strong>
      <div class="score-delta">${deltaMarkup(score.delta, score.note)}</div>
    </article>`;
  }).join('');

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

function selectIndicator(indicator) {
  selectedIndicator = indicator;
  document.querySelectorAll('.indicator-link[data-indicator]').forEach((button) => button.classList.toggle('active', button.dataset.indicator === indicator));
  renderPage();
  document.body.classList.remove('menu-open');
}

document.getElementById('reportYear').addEventListener('change', renderPage);
document.querySelectorAll('.indicator-link[data-indicator]').forEach((button) => button.addEventListener('click', () => selectIndicator(button.dataset.indicator)));
document.getElementById('mobileMenu').addEventListener('click', () => document.body.classList.add('menu-open'));
document.getElementById('sidebarMask').addEventListener('click', () => document.body.classList.remove('menu-open'));

renderPage();

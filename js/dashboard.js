// Convert western digits into Khmer digits for display.
const khmerDigits = (value) => String(value).replace(/\d/g, (digit) => '០១២៣៤៥៦៧៨៩'[digit]);

// Mock data: replace this object with data returned from a Google Sheet or API later.
const moduleContent = {
  overview: {
    heading: 'ទិដ្ឋភាពសមិទ្ធកម្មសរុប',
    description: 'តាមដានវឌ្ឍនភាពនៃការអនុវត្តផែនការ ថវិកា និងសូចនាករវិស័យអប់រំក្នុងកន្លែងតែមួយ។',
    chartTitle: 'វឌ្ឍនភាពការអនុវត្តតាមត្រីមាស', statusTitle: 'ស្ថានភាពសូចនាករ',
    labels: ['ថវិកាអនុវត្តរួច (សរុប)', 'សូចនាករសម្រេចបាន (កម្មវិធី)', 'សូចនាករ (អនុកម្មវិធី)'],
    values: [76.57, 90.91, 75], quarters: [56, 68, 80, 91], counts: [80, 6, 2]
  },
  pentagon: {
    heading: 'យុទ្ធសាស្ត្របញ្ចកោណ ដំណាក់កាលទី១',
    description: 'តាមដានការអនុវត្តអាទិភាពគន្លឹះ និងលទ្ធផលគោលដៅនៃយុទ្ធសាស្ត្របញ្ចកោណ។',
    chartTitle: 'កម្រិតអនុវត្តអាទិភាពតាមត្រីមាស', statusTitle: 'ស្ថានភាពគោលដៅអាទិភាព',
    labels: ['ថវិកាអនុវត្តរួច', 'គោលដៅសម្រេចបាន', 'អាទិភាពកំពុងអនុវត្ត'],
    values: [81.2, 88.5, 78.4], quarters: [59, 71, 83, 89], counts: [74, 8, 3]
  },
  national: {
    heading: 'ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ នីតិកាលទី៧',
    description: 'បង្ហាញលទ្ធផលសមិទ្ធកម្មរបស់វិស័យអប់រំដែលរួមចំណែកក្នុងផែនការអភិវឌ្ឍន៍ជាតិ។',
    chartTitle: 'វឌ្ឍនភាពសូចនាករយុទ្ធសាស្ត្រជាតិ', statusTitle: 'ស្ថានភាពសូចនាករជាតិ',
    labels: ['គម្រោងអនុវត្តរួច', 'សូចនាករសម្រេចបាន', 'សកម្មភាពតាមផែនការ'],
    values: [73.6, 84.2, 71.8], quarters: [48, 62, 74, 84], counts: [68, 13, 5]
  },
  education: {
    heading: 'ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ ឆ្នាំ២០២៤–២០២៨',
    description: 'ទិដ្ឋភាពនៃការអនុវត្តផែនការវិស័យអប់រំ ដើម្បីធានាគុណភាព សមធម៌ និងបរិយាបន្ន។',
    chartTitle: 'វឌ្ឍនភាពផែនការវិស័យអប់រំ', statusTitle: 'ស្ថានភាពកម្មវិធីអប់រំ',
    labels: ['ថវិកាអនុវត្តរួច', 'កម្មវិធីសម្រេចបាន', 'អនុកម្មវិធីសម្រេចបាន'],
    values: [78.9, 92.1, 81.6], quarters: [61, 73, 85, 92], counts: [83, 5, 1]
  },
  agreement: {
    heading: 'កិច្ចព្រមព្រៀងសមិទ្ធកម្ម',
    description: 'តាមដានការអនុវត្តកិច្ចព្រមព្រៀង និងគោលដៅការងាររបស់អង្គភាពពាក់ព័ន្ធ។',
    chartTitle: 'វឌ្ឍនភាពកិច្ចព្រមព្រៀងតាមត្រីមាស', statusTitle: 'ស្ថានភាពកិច្ចព្រមព្រៀង',
    labels: ['កិច្ចព្រមព្រៀងអនុវត្តរួច', 'លទ្ធផលសម្រេចបាន', 'សកម្មភាពទាន់ពេល'],
    values: [69.4, 82.7, 74.2], quarters: [45, 58, 70, 83], counts: [65, 14, 6]
  }
};

const yearMultiplier = { 2025: 1, 2024: 0.94, 2023: 0.86 };
const metricKeys = ['budget', 'program', 'subprogram'];
const metricLabelIds = ['budgetLabel', 'programLabel', 'subprogramLabel'];
const chart = document.getElementById('quarterChart');
let activeModule = 'overview';

const formatPercent = (value) => `${khmerDigits(value.toFixed(2))}%`;

function getYearData(module, year) {
  const base = moduleContent[module];
  const multiplier = yearMultiplier[year];
  const values = base.values.map((value) => Math.min(99.99, Number((value * multiplier).toFixed(2))));
  const quarters = base.quarters.map((value) => Math.round(value * multiplier));
  const complete = Math.round(base.counts[0] * multiplier);
  const progress = Math.max(3, base.counts[1] + (year === '2023' ? 4 : year === '2024' ? 2 : 0));
  const totalIndicators = base.counts.reduce((total, count) => total + count, 0);
  const pending = Math.max(1, totalIndicators - complete - progress);

  return { values, quarters, counts: [complete, progress, pending] };
}

function renderDashboard(year) {
  const content = moduleContent[activeModule];
  const data = getYearData(activeModule, year);
  document.getElementById('extraCharts').innerHTML = DashboardCharts.stacked(
    'ស្ថានភាពសូចនាករតាមឆ្នាំ',
    Object.keys(yearMultiplier).map(reportYear => ({
      label: khmerDigits(reportYear), values: getYearData(activeModule, reportYear).counts
    })),
    ['សម្រេចបាន', 'កំពុងអនុវត្ត', 'មិនទាន់ចាប់ផ្ដើម'],
    khmerDigits,
    'ទិន្នន័យគំរូ · ចំនួនសូចនាករ'
  );
  const khmerYear = khmerDigits(year);
  const trends = data.values.map((value) => `+${khmerDigits((value * .052).toFixed(1))}%`);

  document.getElementById('dashboardHeading').textContent = content.heading;
  document.getElementById('dashboardDescription').textContent = content.description;
  document.getElementById('chartTitle').textContent = content.chartTitle;
  document.getElementById('statusTitle').textContent = content.statusTitle;

  metricKeys.forEach((key, index) => {
    document.getElementById(metricLabelIds[index]).textContent = content.labels[index];
    document.getElementById(`${key}Val`).textContent = formatPercent(data.values[index]);
    document.getElementById(`${key}Bar`).style.width = `${data.values[index]}%`;
    document.getElementById(`${key}Trend`).innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ${trends[index]}`;
  });

  chart.innerHTML = data.quarters.map((value, index) => `
    <div class="bar-group"><div class="bar-area"><div class="bar" style="--bar-height:${value}%" data-value="${khmerDigits(value)}%"></div></div><span class="bar-label">ត្រីមាសទី${khmerDigits(index + 1)}</span></div>
  `).join('');

  const average = Math.round(data.quarters.reduce((total, value) => total + value, 0) / data.quarters.length);
  document.getElementById('chartYear').textContent = khmerYear;
  document.getElementById('chartAverage').textContent = `មធ្យមភាគ ${khmerDigits(average)}%`;
  document.getElementById('statusYear').textContent = khmerYear;
  document.getElementById('donut').style.background = `conic-gradient(var(--green) 0 ${data.values[1]}%, var(--line) ${data.values[1]}% 100%)`;
  document.getElementById('donutValue').textContent = `${khmerDigits(Math.round(data.values[1]))}%`;
  ['completeCount', 'progressCount', 'pendingCount'].forEach((id, index) => {
    document.getElementById(id).textContent = khmerDigits(data.counts[index]);
  });
}

function selectModule(module) {
  activeModule = module;
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.module === module));
  document.querySelectorAll('.module-button').forEach((button) => button.classList.toggle('active', button.dataset.module === module));
  renderDashboard(document.getElementById('yearFilter').value);
}

document.getElementById('yearFilter').addEventListener('change', (event) => renderDashboard(event.target.value));
document.getElementById('menuToggle').addEventListener('click', () => {
  if (window.innerWidth <= 850) document.body.classList.toggle('sidebar-open');
  else document.body.classList.toggle('sidebar-collapsed');
});
document.querySelector('.sidebar-backdrop').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
document.querySelectorAll('.nav-link, .module-button').forEach((link) => link.addEventListener('click', () => {
  selectModule(link.dataset.module);
  if (window.innerWidth <= 850) document.body.classList.remove('sidebar-open');
}));

renderDashboard(document.getElementById('yearFilter').value);

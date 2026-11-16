// Links to the indicator views and program cards in the four report sections.
const indicatorCatalog = [
  {"label":"លទ្ធផលនៃកម្មវិធីរង្វាយតម្លៃសិស្សជាអន្តរជាតិ (PISA)","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/pentagon.html?indicator=pisa"},
  {"label":"អត្រារួមនៃការសិក្សានៅ មធ្យមសិក្សាបឋមភូមិ","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/lower-enrollment.html","alias":"អត្រាចូលរៀន"},
  {"label":"អត្រារួមនៃការសិក្សានៅ មធ្យមសិក្សាទុតិយភូមិ","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/lower-enrollment.html?indicator=upperEnrollment","alias":"អត្រាចូលរៀន"},
  {"label":"អត្រាបោះបង់ការសិក្សា នៅមធ្យមសិក្សាបឋមភូមិ","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/lower-enrollment.html?indicator=lowerDropout","alias":"អត្រាបោះបង់"},
  {"label":"អត្រាបោះបង់ការសិក្សា នៅមធ្យមសិក្សាទុតិយភូមិ","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/lower-enrollment.html?indicator=upperDropout","alias":"អត្រាបោះបង់"},
  {"label":"លទ្ធផលនៃកម្មវិធីរង្វាយតម្លៃលទ្ធផលសិក្សានៅតំបន់អាស៊ីអាគ្នេយ៍ (SEA-PLM)","section":"យុទ្ធសាស្ត្របញ្ចកោណ","href":"pages/pentagon.html?indicator=seaplm"},
  {"label":"អត្រាចូលរៀនកុមារអាយុ៥ឆ្នាំ","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=age-five"},
  {"label":"អត្រាពិតនៃការសិក្សានៅបឋមសិក្សា","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=primary"},
  {"label":"អត្រារួមនៃការសិក្សានៅមធ្យមសិក្សាបឋមភូមិ","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=lower-secondary"},
  {"label":"អត្រារួមនៃការសិក្សានៅមធ្យមសិក្សាទុតិយភូមិ","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=upper-secondary"},
  {"label":"អត្រារួមនៃការសិក្សានៅឧត្តមសិក្សា (១៨–២២ ឆ្នាំ)","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=higher-education"},
  {"label":"អត្រាអក្ខរកម្មជនពេញវ័យ (១៥ ឆ្នាំឡើង)","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=adult-literacy"},
  {"label":"ចំនួនសិស្សនៅមធ្យមសិក្សាបច្ចេកទេស","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=technical-students"},
  {"label":"ចំនួននិស្សិតជំនាញបច្ចេកវិទ្យាឌីជីថល","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=digital-students"},
  {"label":"ចំនួនមេដាយពីការប្រកួតកម្រិតតំបន់ និងអន្តរជាតិ","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=medals"},
  {"label":"ចំនួនសាលារៀនគំរូ","section":"ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍ជាតិ","href":"pages/national-plan.html?indicator=model-schools"},
  {"label":"ចំនួនសាលារៀនគំរូ","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=1#indicator-1-1"},
  {"label":"ភាគរយសិស្សថ្នាក់ទី១២ ទទួលបាននិទ្ទេស A, B និង C","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=1#indicator-1-2"},
  {"label":"អត្រារួមនៃការសិក្សានៅឧត្តមសិក្សា (អាយុ ១៨–២២ ឆ្នាំ)","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=2#indicator-2-1"},
  {"label":"ចំនួនគម្រោងស្រាវជ្រាវដែលឆ្លើយតបតម្រូវការទីផ្សារ និងការអភិវឌ្ឍសង្គម–សេដ្ឋកិច្ច ដែលគ្រឹះស្ថានឧត្តមសិក្សា និងឧស្សាហកម្មបានប្រើប្រាស់","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=2#indicator-2-2"},
  {"label":"ចំនួនយុវជនបានបញ្ចប់កម្មវិធីសមមូលអប់រំកម្រិតមូលដ្ឋាន","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=3#indicator-3-1"},
  {"label":"ចំនួនយុវជន និងមនុស្សពេញវ័យបានបញ្ចប់កម្មវិធីអភិវឌ្ឍន៍នៅសាលាគំរូ និងមជ្ឈមណ្ឌលគោលដៅ","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=3#indicator-3-2"},
  {"label":"ចំនួនមេដាយពីការប្រកួតកីឡាអន្តរជាតិ","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=4#indicator-4-1"},
  {"label":"ចំនួនសាលារៀនអនុវត្តកម្មវិធីអប់រំកាយ និងកីឡាស្របតាមស្តង់ដាសាលារៀនគំរូ","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=4#indicator-4-2"},
  {"label":"ភាគរយការទូទាត់ចំណាយថវិកាកម្មវិធីរបស់ក្រសួងអប់រំ យុវជន និងកីឡា","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=5#indicator-5-1"},
  {"label":"ចំនួនសាលារៀនដែលបានអនុវត្តប្រព័ន្ធព័ត៌មានគ្រប់គ្រង","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=5#indicator-5-2"},
  {"label":"មធ្យមសិក្សាទុតិយភូមិ","section":"ផែនការយុទ្ធសាស្ត្រវិស័យអប់រំ","href":"pages/education-strategy.html?program=5#indicator-5-3"},
  {"label":"ចំនួនសាលារៀនគំរូ","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=1#indicator-1-1"},
  {"label":"ភាគរយសិស្សថ្នាក់ទី១២ ទទួលបាននិទ្ទេស A, B និង C","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=1#indicator-1-2"},
  {"label":"អត្រារួមនៃការសិក្សានៅឧត្តមសិក្សា (អាយុ ១៨–២២ ឆ្នាំ)","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=2#indicator-2-1"},
  {"label":"ចំនួនគម្រោងស្រាវជ្រាវដែលឆ្លើយតបតម្រូវការទីផ្សារ និងការអភិវឌ្ឍសង្គម–សេដ្ឋកិច្ច ដែលគ្រឹះស្ថានឧត្តមសិក្សា និងឧស្សាហកម្មបានប្រើប្រាស់","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=2#indicator-2-2"},
  {"label":"ចំនួនយុវជនបានបញ្ចប់កម្មវិធីសមមូលអប់រំកម្រិតមូលដ្ឋាន","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=3#indicator-3-1"},
  {"label":"ចំនួនយុវជន និងមនុស្សពេញវ័យបានបញ្ចប់កម្មវិធីអភិវឌ្ឍន៍នៅសាលាគំរូ និងមជ្ឈមណ្ឌលគោលដៅ","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=3#indicator-3-2"},
  {"label":"ចំនួនមេដាយពីការប្រកួតកីឡាអន្តរជាតិ","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=4#indicator-4-1"},
  {"label":"ចំនួនសាលារៀនអនុវត្តកម្មវិធីអប់រំកាយ និងកីឡាស្របតាមស្តង់ដាសាលារៀនគំរូ","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=4#indicator-4-2"},
  {"label":"ភាគរយការទូទាត់ចំណាយថវិកាកម្មវិធីរបស់ក្រសួងអប់រំ យុវជន និងកីឡា","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=5#indicator-5-1"},
  {"label":"ចំនួនសាលារៀនដែលបានអនុវត្តប្រព័ន្ធព័ត៌មានគ្រប់គ្រង","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=5#indicator-5-2"},
  {"label":"មធ្យមសិក្សាទុតិយភូមិ","section":"កិច្ចព្រមព្រៀងសមិទ្ធកម្ម","href":"pages/performance-agreement.html?program=5#indicator-5-3"}
];

const searchInput = document.getElementById('indicatorSearch');
const searchRegion = searchInput.closest('.indicator-search');
const searchPanel = document.getElementById('indicatorSearchPanel');
const searchResults = document.getElementById('indicatorMatches');
const searchStatus = document.getElementById('indicatorSearchStatus');

function normalizeSearch(value) {
  return value.normalize('NFC').toLowerCase()
    .replace(/[០-៩]/g, digit => '០១២៣៤៥៦៧៨៩'.indexOf(digit))
    .replace(/[\s\u200b\u200c\u200d–—-]+/g, '');
}

const indexedIndicators = indicatorCatalog.map(entry => ({
  ...entry,
  searchText: normalizeSearch(entry.label + ' ' + entry.section + ' ' + (entry.alias ?? ''))
}));

function showMatches() {
  const query = normalizeSearch(searchInput.value);
  const matches = query ? indexedIndicators.filter(entry => entry.searchText.includes(query)) : [];
  searchResults.replaceChildren();
  searchPanel.hidden = !query;
  searchResults.hidden = !matches.length;
  searchStatus.textContent = !query ? '' : matches.length
    ? khmerDigits(matches.length) + ' លទ្ធផល'
    : 'រកមិនឃើញសូចនាករ';
  for (const entry of matches) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = entry.href;
    const title = document.createElement('strong');
    title.textContent = entry.label;
    const section = document.createElement('small');
    section.textContent = entry.section;
    link.append(title, section);
    item.append(link);
    searchResults.append(item);
  }
}

searchInput.addEventListener('input', showMatches);
searchInput.addEventListener('focus', showMatches);
searchRegion.addEventListener('focusout', event => {
  if (event.relatedTarget && !searchRegion.contains(event.relatedTarget)) {
    searchPanel.hidden = true;
  }
});
document.addEventListener('click', event => {
  if (!searchRegion.contains(event.target)) searchPanel.hidden = true;
});
searchRegion.addEventListener('keydown', event => {
  if (event.isComposing || searchPanel.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    searchInput.focus();
    searchPanel.hidden = true;
  }
  if (event.key === 'ArrowDown' && event.target === searchInput) {
    const firstResult = searchResults.querySelector('a');
    if (firstResult) {
      event.preventDefault();
      firstResult.focus();
    }
  }
});

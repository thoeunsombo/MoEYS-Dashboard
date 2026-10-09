const khmerDigits = (value) =>
  String(value).replace(/\d/g, (digit) => "០១២៣៤៥៦៧៨៩"[digit]);
const formatPercent = (value, digits = 1) =>
  `${khmerDigits(Number(value).toFixed(digits))}%`;
const formatNumber = (value) =>
  khmerDigits(Number(value).toLocaleString("en-US"));

// Mock provincial data. This is the only section needed to replace when real data is available.
const provinces = [
  {
    id: "banteay",
    name: "ខេត្តបន្ទាយមានជ័យ",
    short: "ប.មានជ័យ",
    rate: 72.4,
    trend: 1.1,
    students: 17690,
    col: 2,
    row: 1,
  },
  {
    id: "oddar",
    name: "ខេត្តឧត្តរមានជ័យ",
    short: "ឧ.មានជ័យ",
    rate: 60.2,
    trend: 0.7,
    students: 8440,
    col: 3,
    row: 1,
  },
  {
    id: "preahv",
    name: "ខេត្តព្រះវិហារ",
    short: "ព.វិហារ",
    rate: 63.4,
    trend: 1.3,
    students: 9180,
    col: 4,
    row: 1,
  },
  {
    id: "ratana",
    name: "ខេត្តរតនគិរី",
    short: "រ.គិរី",
    rate: 57.7,
    trend: 0.9,
    students: 6680,
    col: 7,
    row: 1,
  },
  {
    id: "battambang",
    name: "ខេត្តបាត់ដំបង",
    short: "បាត់ដំបង",
    rate: 77.2,
    trend: 1.9,
    students: 25360,
    col: 1,
    row: 2,
  },
  {
    id: "siemreap",
    name: "ខេត្តសៀមរាប",
    short: "សៀមរាប",
    rate: 78.5,
    trend: 2.2,
    students: 25820,
    col: 2,
    row: 2,
  },
  {
    id: "kampongthom",
    name: "ខេត្តកំពង់ធំ",
    short: "ក.ធំ",
    rate: 75.6,
    trend: 1.4,
    students: 16530,
    col: 3,
    row: 2,
  },
  {
    id: "stungtreng",
    name: "ខេត្តស្ទឹងត្រែង",
    short: "ស្ទឹងត្រែង",
    rate: 59.3,
    trend: 0.8,
    students: 6120,
    col: 4,
    row: 2,
  },
  {
    id: "kratie",
    name: "ខេត្តក្រចេះ",
    short: "ក្រចេះ",
    rate: 69.1,
    trend: 1.1,
    students: 10190,
    col: 5,
    row: 2,
  },
  {
    id: "mondul",
    name: "ខេត្តមណ្ឌលគិរី",
    short: "ម.គិរី",
    rate: 64.8,
    trend: 1.5,
    students: 4430,
    col: 7,
    row: 2,
  },
  {
    id: "pailin",
    name: "ខេត្តប៉ៃលិន",
    short: "ប៉ៃលិន",
    rate: 72.3,
    trend: 1.2,
    students: 3840,
    col: 1,
    row: 3,
  },
  {
    id: "pursat",
    name: "ខេត្តពោធិ៍សាត់",
    short: "ពោធិ៍សាត់",
    rate: 78.3,
    trend: 1.8,
    students: 15120,
    col: 2,
    row: 3,
  },
  {
    id: "kampongchhnang",
    name: "ខេត្តកំពង់ឆ្នាំង",
    short: "ក.ឆ្នាំង",
    rate: 76.0,
    trend: 1.5,
    students: 14100,
    col: 3,
    row: 3,
  },
  {
    id: "kampongcham",
    name: "ខេត្តកំពង់ចាម",
    short: "ក.ចាម",
    rate: 74.3,
    trend: 1.2,
    students: 21840,
    col: 5,
    row: 3,
  },
  {
    id: "tboung",
    name: "ខេត្តត្បូងឃ្មុំ",
    short: "ត្បូងឃ្មុំ",
    rate: 70.0,
    trend: 1.0,
    students: 18650,
    col: 6,
    row: 3,
  },
  {
    id: "kohkong",
    name: "ខេត្តកោះកុង",
    short: "កោះកុង",
    rate: 68.6,
    trend: 1.7,
    students: 5980,
    col: 1,
    row: 4,
  },
  {
    id: "kampongspeu",
    name: "ខេត្តកំពង់ស្ពឺ",
    short: "ក.ស្ពឺ",
    rate: 78.4,
    trend: 2.0,
    students: 20290,
    col: 2,
    row: 4,
  },
  {
    id: "phnompenh",
    name: "រាជធានីភ្នំពេញ",
    short: "ភ្នំពេញ",
    rate: 86.2,
    trend: 2.8,
    students: 62200,
    col: 3,
    row: 4,
  },
  {
    id: "kandal",
    name: "ខេត្តកណ្ដាល",
    short: "កណ្ដាល",
    rate: 83.1,
    trend: 2.5,
    students: 38670,
    col: 4,
    row: 4,
  },
  {
    id: "preyveng",
    name: "ខេត្តព្រៃវែង",
    short: "ព្រៃវែង",
    rate: 76.7,
    trend: 1.6,
    students: 21810,
    col: 5,
    row: 4,
  },
  {
    id: "svayrieng",
    name: "ខេត្តស្វាយរៀង",
    short: "ស្វាយរៀង",
    rate: 80.0,
    trend: 2.1,
    students: 16740,
    col: 6,
    row: 4,
  },
  {
    id: "sihanouk",
    name: "ខេត្តព្រះសីហនុ",
    short: "ព.សីហនុ",
    rate: 81.0,
    trend: 2.4,
    students: 9870,
    col: 1,
    row: 5,
  },
  {
    id: "kampot",
    name: "ខេត្តកំពត",
    short: "កំពត",
    rate: 79.1,
    trend: 2.2,
    students: 12040,
    col: 2,
    row: 5,
  },
  {
    id: "kep",
    name: "ខេត្តកែប",
    short: "កែប",
    rate: 84.0,
    trend: 2.6,
    students: 1630,
    col: 3,
    row: 5,
  },
  {
    id: "takeo",
    name: "ខេត្តតាកែវ",
    short: "តាកែវ",
    rate: 82.0,
    trend: 2.3,
    students: 25980,
    col: 4,
    row: 5,
  },
];

const yearMultiplier = { 2025: 1, 2024: 0.968, 2023: 0.943 };
const nationalBase = {
  rate: 79,
  trend: 2.3,
  students: 421600,
  target: 80,
  series: [74.7, 75.2, 79],
};
let selectedProvince = "all";
let hoveredProvince = null;
let descending = true;
let mapInitialized = false;
let mapDataById = new Map();
const mapGroupsByProvince = new Map();

// The Khmer labels below match the paths in assets/cambodia-map.html.
const mapProvinceLabels = {
  បន្ទាយមានជ័យ: "banteay",
  បាត់ដំបង: "battambang",
  កំពង់ចាម: "kampongcham",
  កំពង់ឆ្នាំង: "kampongchhnang",
  កំពង់ស្ពឺ: "kampongspeu",
  កំពង់ធំ: "kampongthom",
  កំពត: "kampot",
  កណ្តាល: "kandal",
  កោះកុង: "kohkong",
  កែប: "kep",
  ក្រចេះ: "kratie",
  ប៉ៃលិន: "pailin",
  ព្រះសីហនុ: "sihanouk",
  មណ្ឌលគីរី: "mondul",
  ឧត្តមានជ័យ: "oddar",
  ភ្នំពេញ: "phnompenh",
  ពោធិ៍សាត់: "pursat",
  ព្រះវិហារ: "preahv",
  ព្រៃវែង: "preyveng",
  រតនគីរី: "ratana",
  សៀមរាប: "siemreap",
  ស្ទឹងត្រែង: "stungtreng",
  ស្វាយរៀង: "svayrieng",
  តាកែវ: "takeo",
  ត្បូងឃ្មុំ: "tboung",
};

function getYearData(province, year) {
  const multiplier = yearMultiplier[year];
  const rate = Number((province.rate * multiplier).toFixed(1));
  const trend = Number((province.trend * multiplier).toFixed(1));
  const series = [rate - 3.4 * multiplier, rate - 1.5 * multiplier, rate].map(
    (item) => Number(item.toFixed(1)),
  );
  return {
    ...province,
    rate,
    trend,
    students: Math.round(province.students * multiplier),
    series,
  };
}

function nationalData(year) {
  const multiplier = yearMultiplier[year];
  return {
    id: "all",
    name: "ទូទាំងប្រទេស",
    rate: Number((nationalBase.rate * multiplier).toFixed(1)),
    trend: Number((nationalBase.trend * multiplier).toFixed(1)),
    students: Math.round(nationalBase.students * multiplier),
    target: nationalBase.target,
    series: nationalBase.series.map((value) =>
      Number((value * multiplier).toFixed(1)),
    ),
  };
}

function heatColor(rate) {
  if (rate >= 82) return "#14a35f";
  if (rate >= 75) return "#9db91a";
  if (rate >= 65) return "#efa918";
  return "#ea7542";
}

function drawTrendChart(series) {
  const svg = document.getElementById("provinceTrendChart");
  const width = 480;
  const height = 185;
  const left = 34;
  const right = 20;
  const top = 20;
  const bottom = 25;
  const min = Math.floor(Math.min(...series) - 2);
  const max = Math.ceil(Math.max(...series) + 2);
  const usableHeight = height - top - bottom;
  const x = (index) =>
    left + ((width - left - right) / (series.length - 1)) * index;
  const y = (value) => top + ((max - value) / (max - min)) * usableHeight;
  const points = series
    .map((value, index) => `${x(index)},${y(value)}`)
    .join(" ");
  const fillPath = `M ${x(0)} ${height - bottom} L ${points.replaceAll(" ", " L ")} L ${x(series.length - 1)} ${height - bottom} Z`;
  const grids = Array.from({ length: 4 }, (_, index) => {
    const value = min + ((max - min) / 3) * index;
    const lineY = y(value);
    return `<line x1="${left}" x2="${width - right}" y1="${lineY}" y2="${lineY}" stroke="#e6eef5" stroke-width="1"/><text x="2" y="${lineY + 4}" fill="#8497ab" font-size="10">${khmerDigits(value.toFixed(0))}%</text>`;
  }).join("");
  const dots = series
    .map(
      (value, index) =>
        `<circle cx="${x(index)}" cy="${y(value)}" r="4.5" fill="#0b75d8" stroke="#fff" stroke-width="2"/><text x="${x(index)}" y="${y(value) - 11}" fill="#1760a9" font-size="11" font-weight="600" text-anchor="middle">${formatPercent(value)}</text>`,
    )
    .join("");
  svg.innerHTML = `${grids}<path d="${fillPath}" fill="rgba(35,145,225,.18)"/><polyline points="${points}" fill="none" stroke="#0b75d8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
}

function renderProvinceDetail(current, allData, year) {
  const rank =
    current.id === "all"
      ? null
      : [...allData]
          .sort((a, b) => b.rate - a.rate)
          .findIndex((item) => item.id === current.id) + 1;
  const achieved = current.rate >= nationalBase.target;
  document.getElementById("provinceTitle").textContent = current.name;
  document.getElementById("provinceSubtitle").textContent =
    `អត្រារួមនៃការសិក្សា ឆ្នាំ${khmerDigits(year)}`;
  document.getElementById("rankBadge").textContent = rank
    ? `ចំណាត់ថ្នាក់ទី${khmerDigits(rank)}`
    : "សរុប";
  document.getElementById("provinceRate").textContent = formatPercent(
    current.rate,
    2,
  );
  const change = document.getElementById("provinceChange");
  change.className = current.trend >= 0 ? "positive" : "negative";
  change.innerHTML = `<i class="fa-solid fa-arrow-trend-${current.trend >= 0 ? "up" : "down"}"></i> ${current.trend >= 0 ? "+" : ""}${formatPercent(current.trend)} ធៀបនឹងឆ្នាំមុន`;
  document.getElementById("studentCount").textContent = formatNumber(
    current.students,
  );
  document.getElementById("provinceTarget").textContent = formatPercent(
    nationalBase.target,
  );
  document.getElementById("provinceStatus").textContent = achieved
    ? "សម្រេចគោលដៅ"
    : "កំពុងអនុវត្ត";
  drawTrendChart(current.series);
}

async function loadProvinceMap() {
  const mapRoot = document.getElementById("provinceMap");

  try {
    const response = await fetch("../assets/cambodia-map.html");
    if (!response.ok) throw new Error("Could not load Cambodia SVG map");
    mapRoot.innerHTML = await response.text();

    mapRoot.querySelectorAll("#cambodiaMap > g").forEach((group) => {
      const label = group.querySelector("text")?.textContent.trim();
      const provinceId = mapProvinceLabels[label];
      if (!provinceId) return;

      group.dataset.province = provinceId;
      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", `មើលទិន្នន័យ${label}`);
      group.addEventListener("click", () => selectProvince(provinceId));
      group.addEventListener("pointerenter", () =>
        previewProvince(provinceId, group),
      );
      group.addEventListener("pointerleave", clearProvincePreview);
      group.addEventListener("focus", () => previewProvince(provinceId, group));
      group.addEventListener("blur", clearProvincePreview);
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectProvince(provinceId);
        }
      });
      mapGroupsByProvince.set(provinceId, group);
    });

    mapInitialized = true;
    renderMap([...mapDataById.values()]);
  } catch (error) {
    mapRoot.innerHTML = `<p class="map-load-error">មិនអាចបង្ហាញផែនទីបានទេ។ សូមពិនិត្យឯកសារ <code>assets/cambodia-map.html</code>។</p>`;
  }
}

function showMapTooltip(province, group) {
  const tooltip = document.getElementById("mapTooltip");
  const svg = document.getElementById("cambodiaMap");
  if (!svg || !group || !province) {
    tooltip.hidden = true;
    return;
  }

  const box = group.getBBox();
  const viewBox = svg.viewBox.baseVal;
  const x = Math.max(22, Math.min(78, ((box.x + box.width / 2) / viewBox.width) * 100));
  const y = Math.max(23, Math.min(76, ((box.y + box.height / 2) / viewBox.height) * 100));
  const reachedTarget = province.rate >= nationalBase.target;

  tooltip.hidden = false;
  tooltip.style.left = `${x}%`;
  tooltip.style.top = `${y}%`;
  document.getElementById("mapTooltipTitle").textContent = province.name;
  document.getElementById("tooltipRate").textContent = formatPercent(province.rate, 2);
  document.getElementById("tooltipStudents").textContent = formatNumber(province.students);
  document.getElementById("tooltipTrend").textContent = `${province.trend >= 0 ? "+" : ""}${formatPercent(province.trend)}`;
  document.getElementById("tooltipStatus").innerHTML = `<i class="fa-solid fa-circle-check"></i> ${reachedTarget ? "សម្រេចគោលដៅប្រចាំឆ្នាំ" : "កំពុងអនុវត្តតាមផែនការ"}`;
}

function renderActiveProvincePanel(current, allData, year) {
  const isNational = current.id === "all";
  const label = document.getElementById("activeRateLabel");
  const trend = document.getElementById("targetTrend");

  label.innerHTML = isNational
    ? `អត្រារួមនៃការសិក្សាឆ្នាំ <span id="selectedYearLabel">${khmerDigits(year)}</span>`
    : `អត្រារួមនៃការសិក្សា · ${current.name}`;
  document.getElementById("targetRate").textContent = formatPercent(
    current.rate,
    2,
  );
  trend.innerHTML = `<i class="fa-solid fa-arrow-trend-${current.trend >= 0 ? "up" : "down"}"></i> ${current.trend >= 0 ? "+" : ""}${formatPercent(current.trend)} ធៀបនឹងឆ្នាំមុន`;
  renderProvinceDetail(current, allData, year);
}

function updateMapSelectionState() {
  mapGroupsByProvince.forEach((group, provinceId) => {
    group.classList.toggle("is-selected", provinceId === selectedProvince);
    group.classList.toggle("is-hovered", provinceId === hoveredProvince);
  });
}

function previewProvince(provinceId, group) {
  const province = mapDataById.get(provinceId);
  if (!province) return;

  hoveredProvince = provinceId;
  updateMapSelectionState();
  renderActiveProvincePanel(
    province,
    [...mapDataById.values()],
    document.getElementById("enrollmentYear").value,
  );
  showMapTooltip(province, group);
}

function clearProvincePreview() {
  if (!hoveredProvince) return;

  hoveredProvince = null;
  updateMapSelectionState();
  const year = document.getElementById("enrollmentYear").value;
  const current =
    selectedProvince === "all"
      ? nationalData(year)
      : mapDataById.get(selectedProvince);

  if (!current) return;
  renderActiveProvincePanel(current, [...mapDataById.values()], year);
  if (selectedProvince === "all") document.getElementById("mapTooltip").hidden = true;
  else showMapTooltip(current, mapGroupsByProvince.get(selectedProvince));
}

function renderMap(data) {
  mapDataById = new Map(data.map((province) => [province.id, province]));
  if (!mapInitialized) return;

  mapGroupsByProvince.forEach((group, provinceId) => {
    const province = mapDataById.get(provinceId);
    const path = group.querySelector("path");
    const label = group.querySelector("text");
    if (!province || !path) return;

    const color = heatColor(province.rate);
    path.setAttribute("fill", color);
    path.setAttribute("opacity", "0.93");
    group.setAttribute("aria-label", `${province.name}: ${formatPercent(province.rate, 2)}`);
    if (label) label.setAttribute("fill", province.rate >= 75 ? "#ffffff" : "#183e70");
  });

  updateMapSelectionState();
  if (hoveredProvince) showMapTooltip(mapDataById.get(hoveredProvince), mapGroupsByProvince.get(hoveredProvince));
  else if (selectedProvince === "all") document.getElementById("mapTooltip").hidden = true;
  else showMapTooltip(mapDataById.get(selectedProvince), mapGroupsByProvince.get(selectedProvince));
}

function renderTable(data) {
  const ordered = [...data].sort((a, b) =>
    descending ? b.rate - a.rate : a.rate - b.rate,
  );
  document.getElementById("provinceTable").innerHTML = ordered
    .map(
      (province, index) =>
        `<button class="ranking-row ${province.id === selectedProvince ? "active" : ""}" type="button" data-province="${province.id}"><span class="rank-number">${khmerDigits(index + 1)}</span><span class="province-name">${province.name}</span><span class="table-rate">${formatPercent(province.rate, 2)}</span><span class="table-trend ${province.trend < 0 ? "down" : ""}"><i class="fa-solid fa-arrow-trend-${province.trend < 0 ? "down" : "up"}"></i> ${province.trend >= 0 ? "+" : ""}${formatPercent(province.trend)}</span><span class="table-progress"><span><i style="width:${Math.min(100, (province.rate / 90) * 100)}%"></i></span><small>${khmerDigits(Math.round((province.rate / 90) * 100))}%</small></span></button>`,
    )
    .join("");
  document
    .querySelectorAll(".ranking-row")
    .forEach((row) =>
      row.addEventListener("click", () => selectProvince(row.dataset.province)),
    );
}

function renderDashboard() {
  const year = document.getElementById('enrollmentYear').value;
  const data = provinces.map((province) => getYearData(province, year));
  const national = nationalData(year);
  const current =
    selectedProvince === "all"
      ? national
      : data.find((province) => province.id === selectedProvince);
  const provinceGoalCount = data.filter(
    (province) => province.rate >= nationalBase.target,
  ).length;

  document.getElementById('nationalRate').textContent = formatPercent(national.rate, 2);
  document.getElementById('targetRate').textContent = formatPercent(current.rate, 2);
  document.getElementById('selectedYearLabel').textContent = khmerDigits(year);
  document.getElementById('targetTrend').innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> +${formatPercent(current.trend)} ធៀបនឹងឆ្នាំមុន`;
  document.getElementById('targetProvinces').textContent = `${khmerDigits(provinceGoalCount)} ខេត្ត`;
  renderMap(data);
  renderActiveProvincePanel(current, data, year);
  renderTable(data);
}

function selectProvince(id) {
  selectedProvince = id;
  document.getElementById("provinceFilter").value = id;
  renderDashboard();
}

function populateProvinceFilter() {
  const select = document.getElementById("provinceFilter");
  select.innerHTML = `<option value="all">ទូទាំងប្រទេស</option>${provinces.map((province) => `<option value="${province.id}">${province.name}</option>`).join("")}`;
}

populateProvinceFilter();
document
  .getElementById("enrollmentYear")
  .addEventListener("change", renderDashboard);
document
  .getElementById("provinceFilter")
  .addEventListener("change", (event) => selectProvince(event.target.value));
document.getElementById("sortButton").addEventListener("click", () => {
  descending = !descending;
  renderDashboard();
});
document
  .getElementById("mobileMenu")
  .addEventListener("click", () => document.body.classList.add("menu-open"));
document
  .getElementById("sidebarMask")
  .addEventListener("click", () => document.body.classList.remove("menu-open"));
loadProvinceMap();
renderDashboard();

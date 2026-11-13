const DashboardCharts = (() => {
  const colors = ['#205cd4', '#08778d', '#965a06', '#107744', '#ba3838'];
  const escape = value => String(value).replace(/[&<>]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;'
  })[char]);

  function bars(title, entries, format, { subtitle = '', max, marker } = {}) {
    const scale = max ?? Math.max(1, ...entries.map(entry => entry.value));
    const rows = entries.map(({ label, value, color, selected }, index) => {
      const width = Math.max(0, Math.min(100, value / scale * 100));
      return `<li class="dashboard-viz-row${selected ? ' is-current' : ''}">
        <span>${escape(label)}</span><strong>${escape(format(value))}</strong>
        <div class="dashboard-viz-track" aria-hidden="true">
          <span style="--width:${width}%;--series:${color ?? colors[index % colors.length]}"></span>
          ${marker == null ? '' : `<i style="--marker:${marker / scale * 100}%"></i>`}
        </div>
      </li>`;
    }).join('');
    return panel(title, subtitle, `<ul class="dashboard-viz-bars">${rows}</ul>`);
  }

  function stacked(title, rows, legend, format, subtitle = '') {
    const scale = Math.max(1, ...rows.map(row => row.values.reduce((sum, value) => sum + value, 0)));
    const key = legend.map((label, index) =>
      `<li><i style="--series:${colors[index]}" aria-hidden="true"></i>${escape(label)}</li>`).join('');
    const tracks = rows.map(({ label, values }) => {
      const summary = values.map((value, index) => legend[index] + ' ' + format(value)).join(' · ');
      const segments = values.map((value, index) => value > 0
        ? `<span style="--width:${value / scale * 100}%;--series:${colors[index]}"></span>` : '').join('');
      return `<li class="dashboard-viz-row"><span>${escape(label)}</span>
        <small>${escape(summary)}</small><div class="dashboard-viz-track" aria-hidden="true">${segments}</div></li>`;
    }).join('');
    return panel(title, subtitle,
      `<ul class="dashboard-viz-key">${key}</ul><ul class="dashboard-viz-bars">${tracks}</ul>`);
  }

  function panel(title, subtitle, body) {
    return `<article class="dashboard-viz-panel"><header><h2>${escape(title)}</h2>
      ${subtitle ? `<p>${escape(subtitle)}</p>` : ''}</header>${body}</article>`;
  }

  return { bars, stacked };
})();

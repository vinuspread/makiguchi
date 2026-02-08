const content = document.querySelector('.content table');
const graph = document.querySelector('#progress em');
const graphTotal = document.querySelector('#total');

const updateProgress = () => {
  const total = content.querySelectorAll('.list').length;
  const finish = content.querySelectorAll('.list .end').length;
  const progress = Math.floor((finish / total) * 100);
  graph.style.width = progress + '%';
  graphTotal.innerHTML = `
    ${finish} / ${total}page <span class='percent'>진행률 ${progress}%</span>
`;
};

const ProjectName = (title) => {
  document.title = title;
  document.querySelector('h1').innerHTML = `${escapeHTML(title)} 작업 현황`;
};

const escapeHTML = (s = '') =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const pageRow = (r) => {
  const title = escapeHTML(r.title);
  const href = escapeHTML(r.href || '#');
  const display = escapeHTML(r.display || r.href || '');
  const start = escapeHTML(r.start || '');
  const update = escapeHTML(r.update || '');
  const flags = Array.isArray(r.flags) ? r.flags : [];
  const [f1 = false, f2 = false, f3 = false] = flags;

  const states = Array.isArray(r.states) ? r.states : [];
  const stateA = escapeHTML(states[0] || '');
  const stateB = escapeHTML(states[1] || '');

  const note = escapeHTML(r.note || '');

  return `
  <tr class="list">
    <td>${title}</td>
    <td><a href="${href}" target="_blank" rel="noopener">${display}</a></td>
    <td>${update}</td>
    <td>${f1 ? '⭕' : '❌'}</td>
    <td>${f2 ? '⭕' : '❌'}</td>
    <td>${f3 ? '⭕' : '❌'}</td>
    <td><span class="state ${stateA}"></span></td>
    <td><span class="state ${stateB}"></span></td>
    <td><p class="t_em">${note}</p></td>
  </tr>`;
};

const categoryRow = (label, colspan = 9) => `
  <tr>
    <td class="category" colspan="${colspan}">${escapeHTML(label)}</td>
  </tr>
`;

const renderTableBody = (tbody, payload) => {
  const colspan = Number(payload.colspan || 9);
  const html = payload.rows
    .map((row) => {
      if (row.type === 'category') return categoryRow(row.label, colspan);
      return pageRow(row);
    })
    .join('');
  tbody.innerHTML = html;
};

(async function filelist() {
  const tbody = content.querySelector('tbody');
  if (!tbody) return;

  try {
    const res = await fetch('/guide/data/filelist.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderTableBody(tbody, data);
    ProjectName(data.projectName);
  } catch (err) {
    console.error('페이지 인덱스 로딩 실패:', err);
    renderTableBody(tbody, { colspan: 9, rows: [] });
  } finally {
    updateProgress();
  }
})();

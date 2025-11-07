// === DBS Graph Search (Optimized, Private R2-Proxy) ===

// Proxy endpoint base (your Worker or Cloudflare Pages Function)
const API_BASE = 'https://dbs-proxy.gravity13501.workers.dev/dbs_data'; // example: /api/data/2012/2012_part1.txt

const DATASETS = {
  '2012': {
    folder: '2012',
    fields: [
      { id: 'id', label: 'პირადი ნომერი' },
      { id: 'last', label: 'გვარი' },
      { id: 'first', label: 'სახელი' },
      { id: 'father', label: 'მამის სახელი' },
      { id: 'dob', label: 'დაბადების თარიღი' },
      { id: 'reg_date', label: 'რეგისტრაციის თარიღი' },
      { id: 'prav', label: 'დმონაც' },
      { id: 'gender', label: 'სქესი' },
      { id: 'licnum', label: 'მოწმობის ნომერი' },
      { id: 'address', label: 'მისამართი' },
      { id: 'region', label: 'რაიონი' }
    ],
    transliterate: true
  },
  '2016': {
    folder: '2016',
    fields: [
      { id: 'name', label: 'სახელი' },
      { id: 'last', label: 'გვარი' },
      { id: 'id', label: 'პირადი ნომერი' },
      { id: 'email', label: 'ელ-ფოსტა' },
      { id: 'phone', label: 'მობილური ნომერი' },
      { id: 'fact', label: 'ფაქტიური მისამართი' },
      { id: 'legal', label: 'იურიდიული მისამართი' }
    ],
    transliterate: false
  }
};

let currentDataset = '2012';
let abortController = null;

// Georgian transliteration map
const ge2lat = {
  "ა": "a","ბ": "b","გ": "g","დ": "d","ე": "e","ვ": "v","ზ": "z","თ": "T",
  "ი": "i","კ": "k","ლ": "l","მ": "m","ნ": "n","ო": "o","პ": "P","ჟ": "j",
  "რ": "r","ს": "s","ტ": "t","უ": "u","ფ": "f","ქ": "q","ღ": "R","ყ": "y",
  "შ": "S","ჩ": "C","ც": "c","ძ": "Z","წ": "w","ჭ": "W","ხ": "X","ჯ": "J","ჰ": "h"
};
function translit(str) {
  return str.replace(/[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]/g, c => ge2lat[c] || c);
}

// === UI References ===
const dsSelect = document.getElementById('dataset-select');
const searchForm = document.getElementById('advanced-search');
const fieldsContainer = document.getElementById('search-fields');
const resultsList = document.getElementById('results-list');
const progressDiv = document.getElementById('progress-message');
const cyEl = document.getElementById('cyto-graph');
let cy = null;

// === Initialize ===
dsSelect.addEventListener('change', () => {
  currentDataset = dsSelect.value;
  renderFields();
  if (abortController) abortController.abort(); // cancel previous search
  resultsList.innerHTML = '';
  progressDiv.textContent = '';
});
renderFields();

// Render input fields dynamically
function renderFields() {
  const ds = DATASETS[currentDataset];
  fieldsContainer.innerHTML = '';
  ds.fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'field-row';
    div.innerHTML = `<label>${f.label}</label><input type="text" id="f-${f.id}" placeholder="${f.label}">`;
    fieldsContainer.appendChild(div);
  });
}

// === Handle Search ===
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  if (abortController) abortController.abort(); // stop previous
  abortController = new AbortController();
  resultsList.innerHTML = '';
  progressDiv.textContent = '🔍 Searching...';
  startSearch(abortController.signal);
});

async function startSearch(signal) {
  const ds = DATASETS[currentDataset];
  const folder = ds.folder;

  // Build search criteria
  const criteria = {};
  ds.fields.forEach(f => {
    const val = document.getElementById(`f-${f.id}`).value.trim();
    if (val) criteria[f.id] = val;
  });

  // Load manifest
  let manifest;
  try {
    const m = await fetch(`${API_BASE}/${folder}/manifest.json`, { signal });
    if (!m.ok) throw new Error('Manifest missing');
    manifest = await m.json();
  } catch (err) {
    if (err.name === 'AbortError') return;
    progressDiv.textContent = '⚠️ Error loading manifest';
    return;
  }

  let total = manifest.length;
  let processed = 0;
  let matches = [];

  if (cy) { cy.destroy(); cy = null; }
  cy = cytoscape({
    container: cyEl,
    layout: { name: 'cose', animate: true },
    style: [
      { selector: 'node', style: { 'background-color': '#0076ff', 'label': 'data(label)', 'color': '#fff', 'border-width': 3, 'border-color': '#ff61e6', 'font-size': '12px' }},
      { selector: 'edge', style: { 'line-color': '#ff61e6', 'width': 2 }}
    ]
  });

  for (const file of manifest) {
    if (signal.aborted) return;
    processed++;
    progressDiv.textContent = `📦 Loading ${processed}/${total}`;
    try {
      const txt = await fetch(`${API_BASE}/${folder}/${file}`, { signal }).then(r => r.text());
      const rows = parseRows(txt, currentDataset);
      const found = filterRows(rows, criteria, ds.transliterate);
      for (const r of found) {
        matches.push(r);
        addNode(r);
      }
      if (matches.length) renderTable(matches);
    } catch (e) {
      if (e.name === 'AbortError') return;
      continue;
    }
  }
  progressDiv.textContent = matches.length ? `✅ Found ${matches.length} results` : '❌ No matches';
}

// === Row Parsing ===
function parseRows(txt, dataset) {
  const lines = txt.split(/\r?\n/).filter(Boolean);
  if (dataset === '2012') {
    return lines.map(line => {
      const parts = line.replace(/^"|"$/g, '').split(/","/);
      return {
        id: parts[0],
        last: parts[1],
        first: parts[2],
        father: parts[3],
        dob: parts[4],
        reg_date: parts[5] || '',
        prav: parts[6] || '',
        gender: parts[7],
        licnum: parts[8] || '',
        address: parts[9],
        region: parts[10]
      };
    });
  } else {
    return lines.map(line => {
      const parts = line.replace(/^"|"$/g, '').split(/["\t,]+/).filter(Boolean);
      return {
        name: parts[0],
        last: parts[1],
        id: parts[2],
        email: parts[3],
        phone: parts[4],
        fact: parts[5],
        legal: parts[6]
      };
    });
  }
}

// === Search Filtering ===
function filterRows(rows, criteria, transliterateFlag) {
  return rows.filter(r => {
    for (const [k, v] of Object.entries(criteria)) {
      if (!v) continue;
      let val = r[k] || '';
      let query = v;
      if (transliterateFlag) {
        val = translit(val);
        query = translit(query);
      }
      if (!val.toLowerCase().includes(query.toLowerCase())) return false;
    }
    return true;
  });
}

// === Visualization ===
function addNode(record) {
  const id = `n${record.id || Math.random()}`;
  const label = record.last || record.name || 'unknown';
  if (cy.getElementById(id).nonempty()) return;
  cy.add({ data: { id, label } });
  cy.layout({ name: 'cose', animate: true }).run();
}

function renderTable(records) {
  const ds = DATASETS[currentDataset];
  const headers = ds.fields.map(f => `<th>${f.label}</th>`).join('');
  const rows = records.slice(-50).map(r => {
    const cells = ds.fields.map(f => `<td>${r[f.id] || ''}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');
  resultsList.innerHTML = `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
}

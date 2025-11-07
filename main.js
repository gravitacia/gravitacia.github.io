// --- Georgian → Latin transliteration map ---
const ge2lat = {
  "ა": "a","ბ": "b","გ": "g","დ": "d","ე": "e","ვ": "v","ზ": "z","თ": "T",
  "ი": "i","კ": "k","ლ": "l","მ": "m","ნ": "n","ო": "o","პ": "P","ჟ": "j",
  "რ": "r","ს": "s","ტ": "t","უ": "u","ფ": "f","ქ": "q","ღ": "R","ყ": "y",
  "შ": "S","ჩ": "C","ც": "c","ძ": "Z","წ": "w","ჭ": "W","ხ": "X","ჯ": "J","ჰ": "h"
};
function translit(str) {
  return str.replace(/[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]/g, l => ge2lat[l] || l);
}

// --- Dataset Definitions ---
const DATASETS = {
  "2012": {
    folder: "data/2012",
    headers: [
      "პირადი ნომერი","გვარი","სახელი","მამის სახელი","დაბადების თარიღი",
      "დმონაც","პრივა","სქესი","პრავის ნომერი","მისამართი","რაიონი"
    ],
    fields: ["id","last","first","father","dob","dmonac","prava","gender","licnum","address","region"]
  },
  "2016": {
    folder: "data/2016",
    headers: [
      "სახელი","გვარი","პირადი ნომერი","ელ-ფოსტა","მობილური ნომერი","ფაქტიური მისამართი","იურიდიული მისამართი"
    ],
    fields: ["name","last","id","email","phone","fact","legal"]
  }
};

// --- State ---
let currentDataset = "2012";
let abortController = null;
let cy = null;

// --- DOM Elements ---
const datasetSelect = document.getElementById("dataset");
const progressBar = document.querySelector("#progress-bar span");
const progressText = document.getElementById("progress-text");
const gridDiv = document.getElementById("grid");
const graphDiv = document.getElementById("graph");

// === Handle Dataset Switch ===
datasetSelect.addEventListener("change", () => {
  stopSearch();
  currentDataset = datasetSelect.value;
  document.querySelectorAll(".fields").forEach(f => f.classList.remove("active"));
  document.getElementById(`fields-${currentDataset}`).classList.add("active");
});

// === Handle Search Submit ===
document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  stopSearch();
  startSearch();
});

// === Stop Search ===
function stopSearch() {
  if (abortController) {
    abortController.abort();
    abortController = null;
    progressText.textContent = "ძებნა შეჩერებულია";
  }
}

// === Start Search ===
async function startSearch() {
  const folder = DATASETS[currentDataset].folder;
  const filters = collectFilters();
  const activeFilters = Object.entries(filters).filter(([k,v]) => v !== "");
  if (activeFilters.length === 0) {
    progressText.textContent = "გთხოვთ შეიყვანოთ მინიმუმ ერთი ველი";
    return;
  }

  gridDiv.innerHTML = "";
  progressText.textContent = "ძებნა მიმდინარეობს...";
  progressBar.style.width = "0%";

  if (cy) cy.destroy();
  cy = initGraph();
  abortController = new AbortController();

  let manifest;
  try {
    manifest = await fetch(`${folder}/manifest.json`, { signal: abortController.signal }).then(r => r.json());
  } catch (e) {
    if (e.name === "AbortError") return;
    progressText.textContent = "Manifest ვერ ჩაიტვირთა";
    return;
  }

  const { headers, fields } = DATASETS[currentDataset];
  gridDiv.innerHTML = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody id="tbody"></tbody></table>`;
  const tbody = document.getElementById("tbody");
  let found = 0;
  const total = manifest.length;

  // --- Async streaming file-by-file ---
  for (let i = 0; i < total; i++) {
    if (abortController.signal.aborted) return;

    const file = manifest[i];
    const response = await fetch(`${folder}/${file}`, { signal: abortController.signal });
    const text = await response.text();

    // Only parse relevant columns for speed
    const rows = parseChunkOptimized(text, currentDataset, activeFilters.map(([k]) => k));

    for (const row of rows) {
      if (abortController.signal.aborted) return;
      if (matches(row, filters)) {
        found++;
        addRow(row, tbody, fields);
        addNode(row);
      }
    }

    // update UI asynchronously
    progressBar.style.width = `${((i + 1) / total) * 100}%`;
    progressText.textContent = `ფაილი ${i + 1}/${total} | ნაპოვნია: ${found}`;
    await new Promise(r => requestAnimationFrame(r));
  }

  if (!abortController.signal.aborted) {
    progressText.textContent = found ? `დასრულებულია: ${found} ჩანაწერი` : "შესაბამისობა არ მოიძებნა";
    cy.layout({ name: "cose", animate: true }).run();
  }
  abortController = null;
}

// === Collect User Filters ===
function collectFilters() {
  const inputs = document.querySelectorAll(`#fields-${currentDataset} input`);
  const f = {};
  inputs.forEach(inp => (f[inp.id.split("-").pop()] = inp.value.trim().toLowerCase()));
  return f;
}

// === Optimized Chunk Parser ===
function parseChunkOptimized(text, dataset, neededFields) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const rows = [];

  for (const line of lines) {
    if (dataset === "2012") {
      const parts = parseCSVLine(line);
      const [id,last,first,father,dob,dmonac,prava,gender,licnum,address,region] =
        parts.map(p => p.replace(/^"|"$/g, "").trim());

      // construct row object only for needed fields
      const r = {};
      for (const key of neededFields) {
        switch (key) {
          case "id": r.id = id; break;
          case "last": r.last = last; break;
          case "first": r.first = first; break;
          case "father": r.father = father; break;
          case "dob": r.dob = dob; break;
          case "dmonac": r.dmonac = dmonac; break;
          case "prava": r.prava = prava; break;
          case "gender": r.gender = gender; break;
          case "licnum": r.licnum = licnum; break;
          case "address": r.address = address; break;
          case "region": r.region = region; break;
        }
      }
      rows.push(r);
    } else {
      const [name,last,id,email,phone,fact,legal] = line.split(/\t/);
      const r = {};
      for (const key of neededFields) {
        switch (key) {
          case "name": r.name = name; break;
          case "last": r.last = last; break;
          case "id": r.id = id; break;
          case "email": r.email = email; break;
          case "phone": r.phone = phone; break;
          case "fact": r.fact = fact; break;
          case "legal": r.legal = legal; break;
        }
      }
      rows.push(r);
    }
  }
  return rows;
}

// --- Simple quoted CSV parser ---
function parseCSVLine(line) {
  const parts = [];
  let current = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuote = !inQuote;
    else if (c === "," && !inQuote) {
      parts.push(current);
      current = "";
    } else current += c;
  }
  parts.push(current);
  return parts;
}

// === Georgian/Latin Aware Match ===
function matches(r, f) {
  return Object.entries(f).every(([k, v]) => {
    if (!v) return true;
    const val = (r[k] || "").toLowerCase();
    const valT = translit(val);
    const vT = translit(v);
    return val.includes(v) || val.includes(vT) || valT.includes(v);
  });
}

// === Add Table Row ===
function addRow(r, body, fields) {
  const tr = document.createElement("tr");
  const cells = fields.map(f => `<td>${r[f] || ""}</td>`).join("");
  tr.innerHTML = cells;
  body.appendChild(tr);
}

// === Graph Setup ===
function initGraph() {
  return cytoscape({
    container: graphDiv,
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#00bfff",
          label: "data(label)",
          color: "#fff",
          "font-size": "10px",
          "border-width": 2,
          "border-color": "#ff61e6"
        }
      },
      { selector: "edge", style: { width: 1, "line-color": "#ff61e6" } }
    ]
  });
}

function addNode(r) {
  const id = "n" + Math.random().toString(36).slice(2, 9);
  const label = (r.last || r.name || "").slice(0, 15);
  cy.add({ data: { id, label } });
}

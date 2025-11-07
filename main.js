// === Transliteration Map ===
const ge2lat = {
  "ა": "a","ბ": "b","გ": "g","დ": "d","ე": "e","ვ": "v","ზ": "z","თ": "T",
  "ი": "i","კ": "k","ლ": "l","მ": "m","ნ": "n","ო": "o","პ": "P","ჟ": "j",
  "რ": "r","ს": "s","ტ": "t","უ": "u","ფ": "f","ქ": "q","ღ": "R","ყ": "y",
  "შ": "S","ჩ": "C","ც": "c","ძ": "Z","წ": "w","ჭ": "W","ხ": "X","ჯ": "J","ჰ": "h"
};
function translit(str) {
  return str.replace(/[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]/g, l => ge2lat[l] || l);
}

// === Dataset Configuration ===
const DATASETS = {
  "2012": {
    folder: "data/2012",
    headers: [
      "პირადი ნომერი","გვარი","სახელი","მამის სახელი",
      "დაბადების თარიღი","დმონაც","პრივა","სქესი",
      "პრავის ნომერი","მისამართი","რაიონი"
    ],
    fields: ["id","last","first","father","dob","dmonac","prava","gender","licnum","address","region"]
  },
  "2016": {
    folder: "data/2016",
    headers: [
      "სახელი","გვარი","პირადი ნომერი","ელ-ფოსტა",
      "მობილური ნომერი","ფაქტიური მისამართი","იურიდიული მისამართი"
    ],
    fields: ["name","last","id","email","phone","fact","legal"]
  }
};

// === Globals ===
let currentDataset = "2012";
let abortController = null;
const CACHE = { "2012": [], "2016": [] };

const datasetSelect = document.getElementById("dataset");
const progressBar = document.querySelector("#progress-bar span");
const progressText = document.getElementById("progress-text");
const gridDiv = document.getElementById("grid");
const graphDiv = document.getElementById("graph");
let cy = null;

// === Dataset Switching ===
datasetSelect.addEventListener("change", () => {
  currentDataset = datasetSelect.value;
  document.querySelectorAll(".fields").forEach(f => f.classList.remove("active"));
  document.getElementById(`fields-${currentDataset}`).classList.add("active");
});

// === Preload Everything on Startup ===
window.addEventListener("load", async () => {
  progressText.textContent = "მონაცემების ჩატვირთვა...";
  progressBar.style.width = "0%";

  let totalFiles = 0;
  let loadedFiles = 0;

  // Preload both datasets
  for (const [year, cfg] of Object.entries(DATASETS)) {
    const manifest = await fetch(`${cfg.folder}/manifest.json`).then(r => r.json());
    totalFiles += manifest.length;
    for (const file of manifest) {
      const text = await fetch(`${cfg.folder}/${file}`).then(r => r.text());
      const rows = parseChunk(text, year);
      CACHE[year].push(...rows);
      loadedFiles++;
      progressBar.style.width = `${(loadedFiles / totalFiles) * 100}%`;
      progressText.textContent = `ჩატვირთულია ${loadedFiles}/${totalFiles} ფაილი`;
      await new Promise(r => setTimeout(r, 0));
    }
  }

  progressText.textContent = "ყველა მონაცემი ჩატვირთულია. შეგიძლიათ ძებნა.";
  progressBar.style.width = "100%";
});

// === Search ===
document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  executeSearch();
});

function executeSearch() {
  const filters = collectFilters();
  const rows = CACHE[currentDataset];
  const { headers, fields } = DATASETS[currentDataset];

  gridDiv.innerHTML = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody id="tbody"></tbody></table>`;
  const tbody = document.getElementById("tbody");

  if (cy) cy.destroy();
  cy = initGraph();

  let found = 0;
  progressText.textContent = "ძებნა მიმდინარეობს...";
  progressBar.style.width = "0%";

  const total = rows.length;
  const batchSize = 5000;
  let processed = 0;

  function batchSearch() {
    const end = Math.min(processed + batchSize, total);
    for (let i = processed; i < end; i++) {
      const row = rows[i];
      if (matches(row, filters)) {
        found++;
        addRow(row, tbody, fields);
        addNode(row);
      }
    }
    processed = end;
    progressBar.style.width = `${(processed / total) * 100}%`;
    progressText.textContent = `გადამუშავებულია ${processed}/${total} ჩანაწერი | ნაპოვნია ${found}`;
    if (processed < total) {
      requestIdleCallback(batchSearch);
    } else {
      cy.layout({ name: "cose", animate: true }).run();
      progressText.textContent = `დასრულებულია: ნაპოვნია ${found} ჩანაწერი`;
      progressBar.style.width = "100%";
    }
  }

  batchSearch();
}

// === Utility: Collect Search Inputs ===
function collectFilters() {
  const inputs = document.querySelectorAll(`#fields-${currentDataset} input`);
  const f = {};
  inputs.forEach(inp => (f[inp.id.split("-").pop()] = inp.value.trim().toLowerCase()));
  return f;
}

// === Utility: Parse Data Chunk ===
function parseChunk(text, dataset) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const rows = [];

  for (const line of lines) {
    if (dataset === "2012") {
      // Proper CSV with quoted fields
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

      const [
        id, last, first, father,
        dob, dmonac, prava,
        gender, licnum, address, region
      ] = parts.map(p => p.replace(/^"|"$/g, "").trim());

      rows.push({ id, last, first, father, dob, dmonac, prava, gender, licnum, address, region });
    } else {
      const [name, last, id, email, phone, fact, legal] = line.split(/\t/);
      rows.push({ name, last, id, email, phone, fact, legal });
    }
  }

  return rows;
}

// === Utility: Match with Transliteration ===
function matches(r, f) {
  return Object.entries(f).every(([k, v]) => {
    if (!v) return true;
    const val = (r[k] || "").toLowerCase();
    const valT = translit(val);
    const vT = translit(v);
    return val.includes(v) || val.includes(vT) || valT.includes(v);
  });
}

// === UI Helpers ===
function addRow(r, body, fields) {
  const tr = document.createElement("tr");
  tr.innerHTML = fields.map(f => `<td>${r[f] || ""}</td>`).join("");
  body.appendChild(tr);
}

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

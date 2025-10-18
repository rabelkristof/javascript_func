/**
 * @type {{title: string, width: number}[]}
 */
const headers = [
  {
    title: "Szerző neve",
    width: 1,
  },
  {
    title: "Korszak",
    width: 1,
  },
  {
    title: "Szerelmek",
    width: 2,
  },
];

/**
 * @type {{name: string, korszak: string, szerelem1: string, szerelem2?: string}[]}
 */
const rows = [
  {
    name: "Balassi Bálint",
    korszak: "reformáció",
    szerelem1: "Losonczy Anna",
    szerelem2: "Dobó Krisztina",
  },
  {
    name: "Csokonai Vitéz Mihály",
    korszak: "felvilágosodás",
    szerelem1: "Vajda Juliána",
  },
  {
    name: "Petőfi Sándor",
    korszak: "magyar romantika",
    szerelem1: "Mednyánszky Berta",
    szerelem2: "Szendrey Júlia",
  },
  {
    name: "Ady Endre",
    korszak: "20. század",
    szerelem1: "Léda",
    szerelem2: "Csinszka",
  },
];

const table = document.createElement("table");
document.body.appendChild(table);

const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const theadTr = document.createElement("tr");
table.appendChild(thead);
thead.appendChild(theadTr);
table.appendChild(tbody);

for (const header of headers) {
  let currentHeader = appendCellToParentRow("th", header.title, theadTr);
  if (header.width > 1) currentHeader.colSpan = header.width;
}

for (const row of rows) {
  const currentRow = document.createElement("tr");
  tbody.appendChild(currentRow);

  appendCellToParentRow("td", row.name, currentRow);
  appendCellToParentRow("td", row.korszak, currentRow);
  let szerelem1 = appendCellToParentRow("td", row.szerelem1, currentRow);

  if (row.szerelem2) {
    appendCellToParentRow("td", row.szerelem2, currentRow);
  } else {
    szerelem1.colSpan = 2;
  }
}

/**
 * Létrehoz egy elementet a cellType alapján, beállítjuk neki szövegként a content-et és hozzáfűzzük a parentRow-hoz.
 * @param {("th" | "td")} cellType th vagy td
 * @param {string} content a szöveg ami bele legyen írva
 * @param {HTMLTableRowElement} parentRow a parent amihez appendeljük
 * @returns {HTMLTableCellElement} az element amit létrehoztunk
 */
function appendCellToParentRow(cellType, content, parentRow) {
  const child = document.createElement(cellType);
  child.innerText = content;
  parentRow.appendChild(child);

  return child;
}

/**
 * Hozzáfűz egy sort a fő táblázathoz.
 * @param {{name: string, korszak: string, szerelem1: string, szerelem2?: string}} rowData
 */
function appendRowToTable(rowData) {
  const row = document.createElement("tr");
  tbody.appendChild(row);

  appendCellToParentRow("td", rowData.name, row);
  appendCellToParentRow("td", rowData.korszak, row);
  let szerelem1 = appendCellToParentRow("td", rowData.szerelem1, row);
  if (rowData.szerelem2) {
    appendCellToParentRow("td", rowData.szerelem2, row);
  } else {
    szerelem1.colSpan = 2;
  }
}

/**
 * Akkor hívjuk meg amikor submitelik a form-ot.
 * @param {SubmitEvent} event
 */
function onFormSubmit(event) {
  event.preventDefault();

  const name = /** @type {HTMLInputElement} */ (
    document.getElementById("kolto_nev")
  ).value;
  const korszak = /** @type {HTMLInputElement} */ (
    document.getElementById("korszak")
  ).value;
  const szerelem1 = /** @type {HTMLInputElement} */ (
    document.getElementById("szerelem1")
  ).value;
  const szerelem2 = /** @type {HTMLInputElement} */ (
    document.getElementById("szerelem2")
  ).value;

  appendRowToTable({
    name,
    korszak,
    szerelem1,
    szerelem2: szerelem2 ? szerelem2 : undefined,
  });
}

document.getElementById("form")?.addEventListener("submit", onFormSubmit);

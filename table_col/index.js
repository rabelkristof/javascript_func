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

const table = createAndAppendElementToParent("table", document.body);
const thead = createAndAppendElementToParent("thead", table);
const tbody = createAndAppendElementToParent("tbody", table);
const theadTr = createAndAppendElementToParent("tr", thead);

for (const header of headers) {
  let currentHeader = appendCellToParentRow("th", header.title, theadTr);
  if (header.width > 1) currentHeader.colSpan = header.width;
}

for (const row of rows) {
  const currentRow = createAndAppendElementToParent("tr", tbody);

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
 * @param {"th" | "td"} cellType th vagy td
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
 * Létrehoz egy elemet az elementType alapján és hozzáfűzi a parent-hez.
 * @template K
 * @param {K extends keyof HTMLElementTagNameMap ? K : never} elementType az element amit létre akarunk hozni
 * @param {HTMLElement} parent az element amihez hozzá akarunk fűzni
 * @returns {HTMLElementTagNameMap[K]} az element amit létrehoztunk
 */
function createAndAppendElementToParent(elementType, parent) {
  const elem = document.createElement(elementType);
  parent.appendChild(elem);

  return elem;
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

/**
 * Létrehoz egy labelt a labelText szöveggel és egy inputot és hozzáfűzi a parent-hez.
 * @param {string} inputId Az id amit az input id-ja, name-je és a label for-ja lesz.
 * @param {string} labelText A szöveg amit a labelbe írunk.
 * @param {HTMLFormElement} parent A form, amihez appendeljük.
 * @param {boolean} lineBreak Rakjunk-e linebreaket közéjük (br tag)
 * @returns {HTMLInputElement} A létrehozott input.
 */
function createLabelAndInputAndAppendToForm(
  inputId,
  labelText,
  parent,
  lineBreak
) {
  const label = createAndAppendElementToParent("label", parent);
  if (lineBreak) createAndAppendElementToParent("br", parent);
  const input = createAndAppendElementToParent("input", parent);
  label.htmlFor = inputId;
  label.innerText = labelText;
  input.type = "text";
  input.id = inputId;
  input.name = inputId;

  return input;
}

/**
 * @type {{id: string, label: string}[]}
 */
const formData = [
  { id: "kolto_nev", label: "Költő neve:" },
  { id: "korszak", label: "Korszak:" },
  { id: "szerelem1", label: "Szerelme:" },
  { id: "szerelem2", label: "Szerelme:" },
];

const form = createAndAppendElementToParent("form", document.body);
const h2 = createAndAppendElementToParent("h2", form);
form.id = "form_js";
h2.innerText = "Javascript űrlap";

for (const data of formData) {
  createLabelAndInputAndAppendToForm(data.id, data.label, form, true);
  createAndAppendElementToParent("br", form);
  createAndAppendElementToParent("br", form);
}

const button = createAndAppendElementToParent("button", form);
button.innerText = "Hozzáadás";

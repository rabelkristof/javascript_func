/**
 * @typedef {{settlement: string, branch1: string, example1: string, branch2?: string, example2?: string}} TableRow
 * @typedef {{id: string, name: string, text: string}} FormField
 */

/**
 * @type {string[]}
 */
const headers = ["Ókori település", "Ágazat", "Példa"];

/**
 * @type {TableRow[]}
 */
const tableData = [
  {
    settlement: "Athén",
    branch1: "politika",
    example1: "demokrácia",
    branch2: "tudomány",
    example2: "filozófia",
  },
  {
    settlement: "Egyiptom",
    branch1: "mezőgazdaság",
    example1: "csatornák",
  },
  {
    settlement: "Spárta",
    branch1: "neveléstudomány",
    example1: "agogé",
    branch2: "harcászat",
    example2: "hoplita",
  },
];

const div = createElement("div", document.body);
div.id = "jssection";
div.classList.add("hide");
const table = createElement("table", div);
const thead = createElement("thead", table);
const tbody = createElement("tbody", table);

for (const title of headers) {
  const header = createElement("th", thead);
  header.innerText = title;
}

for (const row of tableData) {
  const tr1 = createElement("tr", tbody);
  const settlement = createElement("td", tr1);
  settlement.innerText = row.settlement;

  createCell("td", row.branch1, tr1);
  createCell("td", row.example1, tr1);
  if (row.branch2 && row.example2) {
    settlement.rowSpan = 2;

    const tr2 = createElement("tr", tbody);
    createCell("td", row.branch2, tr2);
    createCell("td", row.example2, tr2);
  }
}

// Nem null mert benne van a html-ben.
/** @type {HTMLInputElement} */ (
  document.getElementById("tableselector")
).addEventListener("change", handleCheckboxChange);

/**
 * A checkbox eventlistenere.
 * @param {Event} e
 */
function handleCheckboxChange(e) {
  const checkbox = /** @type {HTMLInputElement} */ (e.target);
  hideBasedOnId(checkbox.checked ? "htmlsection" : "jssection");
  showBasedOnId(checkbox.checked ? "jssection" : "htmlsection");
}

/**
 * Elrejt egy elemet az id alapján.
 * @param {string} id
 */
function hideBasedOnId(id) {
  document.getElementById(id)?.classList.add("hide");
}

/**
 * Megjelenít egy elemet az id alapján.
 * @param {string} id
 */
function showBasedOnId(id) {
  document.getElementById(id)?.classList.remove("hide");
}

/**
 * Létrehoz egy cellát cellType alapján, beállítja neki szövegként a content-et és appendeli a parentRow-hoz.
 * @param {"th" | "td"} cellType
 * @param {string} content
 * @param {HTMLTableRowElement} parentRow
 * @returns {HTMLTableCellElement}
 */
function createCell(cellType, content, parentRow) {
  const cell = createElement(cellType, parentRow);
  cell.innerText = content;

  return cell;
}

/**
 * Létrehoz egy elementet és appendeli a parent-hez.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName A létrehozandó element
 * @param {HTMLElement} parent Az element amihez appendeljük
 * @returns {HTMLElementTagNameMap[K]} A létrehozott element
 */
function createElement(tagName, parent) {
  const elem = document.createElement(tagName);
  parent.appendChild(elem);

  return elem;
}

/**
 * @type {FormField[]}
 */
const formFields = [
  { id: "elso", name: "telepules", text: "Település:" },
  { id: "masodik", name: "agazat1", text: "Ágazat:" },
  { id: "harmadik", name: "pelda1", text: "Példa:" },
  { id: "negyedik", name: "agazat2", text: "Ágazat:" },
  { id: "otodik", name: "pelda2", text: "Példa:" },
];

const form = createElement("form", div);

for (const formField of formFields) {
  const outerDiv = createElement("div", form);

  createFormField(formField, outerDiv);

  const span = createElement("span", outerDiv);
  span.classList.add("error");

  createElement("br", outerDiv);
  createElement("br", form);
}

const button = createElement("button", form);
button.type = "submit";
button.innerText = "Hozzáadás";

/**
 * Létrehoz egy label-t és egy input-ot a megadott adat alapján, ezután hozzáadja a formhoz.
 * @param {FormField} data
 * @param {HTMLElement} parent Az element amihez hozzáadjuk
 * @returns {void}
 */
function createFormField(data, parent) {
  const label = createElement("label", parent);
  label.htmlFor = data.name;
  label.innerText = data.text;

  createElement("br", parent);

  const input = createElement("input", parent);
  input.type = "text";
  input.id = data.id;
  input.name = data.name;
}

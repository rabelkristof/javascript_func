/**
 * @typedef {{branch: string, example: string}} Invention
 * @typedef {{settlement: string, inventions: Invention[]}} TableRow
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
    inventions: [
      { branch: "politika", example: "demokrácia" },
      { branch: "tudomány", example: "filozófia" },
    ],
  },
  {
    settlement: "Egyiptom",
    inventions: [{ branch: "mezőgazdaság", example: "csatornák" }],
  },
  {
    settlement: "Spárta",
    inventions: [
      { branch: "neveléstudomány", example: "agogé" },
      { branch: "harcászat", example: "hoplita" },
    ],
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
  const firstRow = createElement("tr", tbody);
  const settlement = createElement("td", firstRow);
  settlement.innerText = row.settlement;
  settlement.rowSpan = row.inventions.length;

  // Az első sort manuálisan inserteljük.
  createCell("td", row.inventions[0].branch, firstRow);
  createCell("td", row.inventions[0].example, firstRow);
  for (let i = 1; i < row.inventions.length; i++) {
    const tr = createElement("tr", tbody);
    createCell("td", row.inventions[i].branch, tr);
    createCell("td", row.inventions[i].example, tr);
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

/**
 * @typedef {{settlement: string, branch1: string, example1: string, branch2?: string, example2?: string}} TableRow
 * @typedef {{id: string, name: string, text: string}} FormField
 * @typedef {{settlement: string, branch: string, example1: string, example2?: string}} HTMLTableRow
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
tbody.id = "jstbody";

for (const title of headers) {
  const header = createElement("th", thead);
  header.innerText = title;
}

generateTableBody(tbody, tableData);

/**
 * Legenerálja a table body-t az adatok alapján;
 * @param {HTMLTableSectionElement} tbody
 * @param {TableRow[]} data
 * @returns {void}
 */
function generateTableBody(tbody, data) {
  for (const row of data) {
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
form.id = "jsform";

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

/** @type {HTMLFormElement} */ (
  document.getElementById("htmlform")
).addEventListener("submit", htmlSubmitHandler);

/**
 * Handleli a html form submitolását. Ellenőrzi az adatokat, jelzi, ha hiba van, és frissíti a táblázatot.
 * @param {SubmitEvent} e
 */
function htmlSubmitHandler(e) {
  e.preventDefault();

  // Nem nullok, mert benne vannak a html-ben.
  const form = /** @type {HTMLFormElement} */ (
    document.getElementById("htmlform")
  );
  const telepules = /** @type {HTMLInputElement} */ (
    form.querySelector("#elso")
  );
  const agazat = /** @type {HTMLInputElement} */ (
    form.querySelector("#masodik")
  );
  const pelda1 = /** @type {HTMLInputElement} */ (
    form.querySelector("#harmadik")
  );
  const pelda2 = /** @type {HTMLInputElement} */ (
    form.querySelector("#negyedik")
  );

  for (const span of /** @type {NodeListOf<HTMLSpanElement>} */ (
    form.querySelectorAll(".error")
  )) {
    span.innerText = "";
  }

  if (validateFields("A mező kitöltése kötelező!", telepules, agazat, pelda1)) {
    const htmlTBody = /** @type {HTMLTableSectionElement} */ (
      document.getElementById("htmltbody")
    );
    /** @type {HTMLTableRow} */
    const rowData = {
      settlement: telepules.value,
      branch: agazat.value,
      example1: pelda1.value,
      example2: pelda2.value ? pelda2.value : undefined,
    };
    appendTableRowToHTMLTable(rowData, htmlTBody);
  }
}

/**
 * Validálja a megadott mezőket, hogy üresek-e, és ha azok, megjeleníti a megadott szöveggel az error spaneket és visszatér a validáció sikerességével.
 * @param {string} message Az error message
 * @param  {...HTMLInputElement} fields A mezők amiket ellenőrizni kell
 * @returns {boolean}
 */
function validateFields(message, ...fields) {
  let success = true;
  for (const field of fields) {
    if (!field.value) {
      // Nem nullok mert korábban létrehoztuk őket.
      const div = /** @type {HTMLDivElement} */ (field.parentElement);
      const span = /** @type {HTMLSpanElement} */ (div.querySelector(".error"));
      span.innerText = message;
      success = false;
    }
  }

  return success;
}

/**
 * Hozzáfűz egy új sort a megadott táblázathoz.
 * @param {HTMLTableRow} rowData A hozzáfűzendő sor adatai
 * @param {HTMLTableSectionElement} tableBody A tbody amihez hozzáfűzűnk
 * @returns {void}
 */
function appendTableRowToHTMLTable(rowData, tableBody) {
  const tr = createElement("tr", tableBody);
  createCell("td", rowData.settlement, tr);
  createCell("td", rowData.branch, tr);
  const example1 = createCell("td", rowData.example1, tr);

  if (rowData.example2) {
    createCell("td", rowData.example2, tr);
  } else {
    example1.colSpan = 2;
  }
}

form.addEventListener("submit", jsSubmitHandler);

/**
 * Handleli a html form submitolását. Ellenőrzi az adatokat, jelzi, ha hiba van, és frissíti a táblázatot.
 * @param {Event} e
 * @returns {void}
 */
function jsSubmitHandler(e) {
  e.preventDefault();

  // Nem nullok, mert benne vannak a html-ben.
  const form = /** @type {HTMLFormElement} */ (
    document.getElementById("jsform")
  );
  const telepules = /** @type {HTMLInputElement} */ (
    form.querySelector("#elso")
  );
  const agazat1 = /** @type {HTMLInputElement} */ (
    form.querySelector("#masodik")
  );
  const pelda1 = /** @type {HTMLInputElement} */ (
    form.querySelector("#harmadik")
  );
  const agazat2 = /** @type {HTMLInputElement} */ (
    form.querySelector("#negyedik")
  );
  const pelda2 = /** @type {HTMLInputElement} */ (
    form.querySelector("#otodik")
  );

  for (const span of /** @type {NodeListOf<HTMLSpanElement>} */ (
    form.querySelectorAll(".error")
  )) {
    span.innerText = "";
  }

  if (validateFields("A mező kitöltése kötelező", telepules, agazat1, pelda1)) {
    /**
     * @type {TableRow}
     */
    const rowData = {
      settlement: telepules.value,
      branch1: agazat1.value,
      example1: pelda1.value,
      branch2: agazat2.value ? agazat2.value : undefined,
      example2: pelda2.value ? pelda2.value : undefined,
    };
    tableData.push(rowData);

    const tableBody = /** @type {HTMLTableSectionElement} */ (
      document.getElementById("jstbody")
    );
    tableBody.innerHTML = "";
    generateTableBody(tableBody, tableData);
  }
}

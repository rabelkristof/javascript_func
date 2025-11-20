/**
 * @typedef {{nationality: string, author1: string, title1: string, author2?: string, title2?: string}} CountryWriters
 * @typedef {{id: string, label: string}} FormLabelData
 */

/**
 * Generál egy header-t a table-nek.
 * @param {HTMLTableElement} table A table amihez csináljuk a headert.
 * @param {string[]} headerList Egy array amiben a headerek szövegei vannak benne.
 */
function generateHeader(table, headerList) {
  const thead = createAndAppendElementToParent("thead", table);
  const tr = createAndAppendElementToParent("tr", thead);
  for (const header of headerList) {
    createAndAppendCellToParentRow("th", header, tr);
  }
}

/**
 * Rendereli a tbody-t a megadott adatok alapján.
 * @param {string} tBodyId A table element.
 * @param {CountryWriters[]} data egy CountryWriters array
 * @returns {void}
 */
function renderTableBody(tBodyId, data) {
  const tBody = /** @type {HTMLTableSectionElement} */ (
    document.getElementById(tBodyId)
  );
  tBody.innerHTML = "";
  for (const row of data) {
    renderTableRow(tBody, row);
  }
}

/**
 * Renderel egy table row-t.
 * @param {HTMLTableSectionElement} tBody a tbody amin rendereljük a sort
 * @param {CountryWriters} writerRow a CountryWriters object ami alapján feltöltjük a sort
 */
function renderTableRow(tBody, writerRow) {
  const tr = createAndAppendElementToParent("tr", tBody);

  const nationality = createAndAppendCellToParentRow(
    "td",
    writerRow.nationality,
    tr
  );
  createAndAppendCellToParentRow("td", writerRow.author1, tr);
  createAndAppendCellToParentRow("td", writerRow.title1, tr);

  if (writerRow.author2 && writerRow.title2) {
    nationality.rowSpan = 2;
    const tr2 = createAndAppendElementToParent("tr", tBody);
    createAndAppendCellToParentRow("td", writerRow.author2, tr2);
    createAndAppendCellToParentRow("td", writerRow.title2, tr2);
  }

  nationality.addEventListener("click", function (e) {
    const target = /** @type {HTMLTableCellElement} */ (e.target);
    const tbody = /** @type {HTMLTableSectionElement} */ (
      target.parentElement?.parentElement
    );

    const markedCell = tbody.querySelector(".marked");
    if (markedCell) markedCell.classList.remove("marked");

    target.classList.add("marked");
  });
}

/**
 * Létrehoz egy table element-et és appendeli a parent-hez.
 * @param {string} tbodyId Az id amit beállítunk a tbody-nak.
 * @param {string[]} headers A headerek szövege.
 * @param {HTMLElement} parent A parent amihez appendeljük a létrehozott table-t.
 * @returns {HTMLTableElement} A létrehozott table.
 */
function createAndAppendTable(tbodyId, headers, parent) {
  const table = createAndAppendElementToParent("table", parent);
  generateHeader(table, headers);
  const tbody = createAndAppendElementToParent("tbody", table);
  tbody.id = tbodyId;

  return table;
}

/**
 * Létrehoz egy labelt a labelText szöveggel és egy inputot és hozzáfűzi a parent-hez.
 * @param {string} inputId Az id amit az input id-ja, name-je és a label for-ja lesz.
 * @param {string} labelText A szöveg amit a labelbe írunk.
 * @param {HTMLFormElement} parent A form, amihez appendeljük.
 * @returns {void}
 */
function createLabelAndInputAndAppendToForm(inputId, labelText, parent) {
  const div = createAndAppendElementToParent("div", parent);
  const label = createAndAppendElementToParent("label", div);
  createAndAppendElementToParent("br", div);
  const input = createAndAppendElementToParent("input", div);
  label.htmlFor = inputId;
  label.innerText = labelText;
  input.type = "text";
  input.id = inputId;
  input.name = inputId;

  const span = createAndAppendElementToParent("span", div);
  span.classList.add("error");
}

/**
 * Létrehoz egy form-ot és appendeli a parent-hez.
 * @param {string} id Az id amit beállítunk a form-nak.
 * @param {FormLabelData[]} formData A labelek a szövege.
 * @param {HTMLElement} parent A parent element amihez appendeljük a table-t.
 * @returns {HTMLFormElement} A létrehozott table.
 */
function createAndAppendForm(id, formData, parent) {
  const form = createAndAppendElementToParent("form", parent);
  form.id = id;
  for (const field of formData) {
    createLabelAndInputAndAppendToForm(field.id, `${field.label}:`, form);
    createAndAppendElementToParent("br", form);
  }

  const button = createAndAppendElementToParent("button", form);
  button.innerText = "Hozzáadás";

  return form;
}

/**
 * Létrehoz egy elemet az elementType alapján és hozzáfűzi a parent-hez.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} elementType az element amit létre akarunk hozni
 * @param {HTMLElement} parent az element amihez hozzá akarunk fűzni
 * @returns {HTMLElementTagNameMap[K]} az element amit létrehoztunk
 */
function createAndAppendElementToParent(elementType, parent) {
  const elem = document.createElement(elementType);
  parent.appendChild(elem);

  return elem;
}

/**
 * Létrehozunk a cellType alapján egy cellát, feltöltjük az innerText-jét a content-tel és appendeljük a parentRow-hoz.
 * @param {"td" | "th"} cellType milyen típusa legyen a cellának
 * @param {string} content a szöveg amit beleírunk
 * @param {HTMLTableRowElement} parentRow a sor amihez appendelünk
 * @returns {HTMLTableCellElement} a létrehozott cella
 */
function createAndAppendCellToParentRow(cellType, content, parentRow) {
  const cell = createAndAppendElementToParent(cellType, parentRow);
  cell.innerText = content;

  return cell;
}

/**
 * Eventlistener callback a html form-nak.
 * @param {Event} e
 */
function htmlEventListener(e) {
  e.preventDefault();
  const target = /** @type {HTMLFormElement} */ (e.target);
  const nemzetiseg = /** @type {HTMLInputElement} */ (
    target.querySelector("#nemzetiseg")
  );
  const szerzo1 = /** @type {HTMLInputElement} */ (
    target.querySelector("#szerzo1")
  );
  const mu1 = /** @type {HTMLInputElement} */ (target.querySelector("#mu1"));
  const szerzo2 = /** @type {HTMLInputElement} */ (
    target.querySelector("#szerzo2")
  );
  const mu2 = /** @type {HTMLInputElement} */ (target.querySelector("#mu2"));

  const errorFields = /** @type {NodeListOf<HTMLSpanElement>} */ (
    target.querySelectorAll(".error")
  );
  for (const error of errorFields) {
    error.innerText = "";
  }

  if (validateFields("A mező kitöltése kötelező", nemzetiseg, szerzo1, mu1)) {
    const nationality = nemzetiseg.value;
    const author1 = szerzo1.value;
    const title1 = mu1.value;
    const author2 = szerzo2.value;
    const title2 = mu2.value;
    /**
     * @type {CountryWriters}
     */
    const obj = {
      nationality,
      author1,
      title1,
      author2,
      title2,
    };

    const tBody = /** @type {HTMLTableSectionElement} */ (
      document.getElementById("tbody")
    );

    renderTableRow(tBody, obj);

    target.reset();
  }
}

/**
 * Megnézi, hogy minden input field tartalmaz-e szöveget.
 * @param {string} errorText A szöveg amit hiba esetén ki akarunk írni.
 * @param  {...HTMLInputElement} inputs Az inputok amiket validálni kell.
 * @returns {boolean} Sikeres volt-e vagy sem.
 */
function validateFields(errorText, ...inputs) {
  let success = true;
  for (const input of inputs) {
    if (!input.value) {
      success = false;
      const parent = /** @type {HTMLDivElement} */ (input.parentElement);
      /** @type {HTMLSpanElement} */ (
        parent.querySelector(".error")
      ).innerText = errorText;
    }
  }

  return success;
}

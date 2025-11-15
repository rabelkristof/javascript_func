/**
 * @typedef {{nationality: string, author1: string, title1: string, author2?: string, title2?: string}} CountryWriters
 */

/**
 * Rendereli a tbody-t a megadott adatok alapján.
 * A tbody amit renderel az a jsTBody id-val rendelkező tbody.
 * @param {HTMLTableElement} table
 * @param {CountryWriters[]} data egy CountryWriters array
 * @returns {void}
 */
function renderTableBody(table, data) {
  const tBody = /** @type {HTMLTableSectionElement} */ (
    table.querySelector("tbody")
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
 * Létrehoz egy labelt a labelText szöveggel és egy inputot és hozzáfűzi a parent-hez.
 * @param {string} inputId Az id amit az input id-ja, name-je és a label for-ja lesz.
 * @param {string} labelText A szöveg amit a labelbe írunk.
 * @param {HTMLFormElement} parent A form, amihez appendeljük.
 * @param {boolean} lineBreak Rakjunk-e linebreaket közéjük (br tag)
 */
function createLabelAndInputAndAppendToForm(
  inputId,
  labelText,
  parent,
  lineBreak
) {
  const div = createAndAppendElementToParent("div", parent);
  const label = createAndAppendElementToParent("label", div);
  if (lineBreak) createAndAppendElementToParent("br", div);
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
 *
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

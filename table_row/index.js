/**
 * @type {string[]}
 */
const headers = ["Nemzetiség", "Szerző", "Mű"];

/**
 * @typedef {{nationality: string, author1: string, title1: string, author2?: string, title2?: string}} TableRow
 */

/**
 * @type {TableRow[]}
 */
const data = [
  {
    nationality: "Orosz",
    author1: "Gogol",
    title1: "A köpönyeg",
    author2: "Csehov",
    title2: "A csinovnyik halála",
  },
  { nationality: "Cseh", author1: "Franz Kafka", title1: "Az átváltozás" },
  {
    nationality: "Magyar",
    author1: "Örkény István",
    title1: "Egyperces Novellák",
    author2: "József Attila",
    title2: "Klárisok",
  },
  {
    nationality: "Svájc",
    author1: "Friedrich Dürrenmatt",
    title1: "A fizikusok",
  },
];

let table = document.createElement("table");
let tHead = document.createElement("thead");
let tBody = document.createElement("tbody");
tBody.id = "jsTBody";
let headerRow = document.createElement("tr");

document.body.appendChild(table);
table.appendChild(tHead);
table.appendChild(tBody);
tHead.appendChild(headerRow);

for (const header of headers) {
  const th = document.createElement("th");
  th.innerText = header;
  headerRow.appendChild(th);
}

renderTableBody(data);

const htmlForm = /** @type {HTMLFormElement} */ (
  document.getElementById("htmlform")
);

htmlForm.addEventListener("submit", function (e) {
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
   * @type {TableRow}
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

  const tr = document.createElement("tr");
  tBody.appendChild(tr);

  const nationalityElem = document.createElement("td");
  const author1Elem = document.createElement("td");
  const title1Elem = document.createElement("td");

  nationalityElem.innerText = obj.nationality;
  author1Elem.innerText = obj.author1;
  title1Elem.innerText = obj.title1;

  tr.appendChild(nationalityElem);
  tr.appendChild(author1Elem);
  tr.appendChild(title1Elem);

  if (obj.author2 && obj.title2) {
    nationalityElem.rowSpan = 2;
    const tr2 = document.createElement("tr");
    const author2 = document.createElement("td");
    const title2 = document.createElement("td");
    author2.innerText = obj.author2;
    title2.innerText = obj.title2;

    tBody.appendChild(tr2);
    tr2.appendChild(author2);
    tr2.appendChild(title2);
  }

  nationalityElem.addEventListener("click", function (e) {
    const target = /** @type {HTMLTableCellElement} */ (e.target);
    target.classList.add("marked");
  });

  htmlForm.reset();
});

/**
 * Rendereli a tbody-t a megadott adatok alapján.
 * A tbody amit renderel az a jsTBody id-val rendelkező tbody.
 * @param {TableRow[]} data egy TableRow array
 * @returns {void}
 */
function renderTableBody(data) {
  const tBody = /** @type {HTMLTableSectionElement} */ (
    document.getElementById("jsTBody")
  );
  tBody.innerHTML = "";
  for (const row of data) {
    const tr = document.createElement("tr");
    tBody.appendChild(tr);

    const nationality = document.createElement("td");
    const author1 = document.createElement("td");
    const title1 = document.createElement("td");

    nationality.innerText = row.nationality;
    author1.innerText = row.author1;
    title1.innerText = row.title1;

    tr.appendChild(nationality);
    tr.appendChild(author1);
    tr.appendChild(title1);

    if (row.author2 && row.title2) {
      nationality.rowSpan = 2;
      const tr2 = document.createElement("tr");
      const author2 = document.createElement("td");
      const title2 = document.createElement("td");
      author2.innerText = row.author2;
      title2.innerText = row.title2;

      tBody.appendChild(tr2);
      tr2.appendChild(author2);
      tr2.appendChild(title2);
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
}

// Nem csináltunk jsform-ot.
// Remélem saját kódból szabad másolni.

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
 * @type {{id: string, label: string}[]}
 */
const formData = [
  { id: "nemzetisegJs", label: "Nemzetiség" },
  { id: "szerzo1Js", label: "Szerző" },
  { id: "mu1Js", label: "Mű" },
  { id: "szerzo2Js", label: "Szerző" },
  { id: "mu2Js", label: "Mű" },
];

const jsForm = createAndAppendElementToParent("form", document.body);
for (const data of formData) {
  createLabelAndInputAndAppendToForm(data.id, data.label, jsForm, true);
  createAndAppendElementToParent("br", jsForm);
  createAndAppendElementToParent("br", jsForm);
}

const button = createAndAppendElementToParent("button", jsForm);
button.innerText = "Hozzáadás";
jsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nationality = /**@type {HTMLInputElement} */ (
    document.getElementById("nemzetisegJs")
  ).value;
  const author1 = /**@type {HTMLInputElement} */ (
    document.getElementById("szerzo1Js")
  ).value;
  const title1 = /**@type {HTMLInputElement} */ (
    document.getElementById("mu1Js")
  ).value;
  const author2 = /**@type {HTMLInputElement} */ (
    document.getElementById("szerzo2Js")
  ).value;
  const title2 = /**@type {HTMLInputElement} */ (
    document.getElementById("mu2Js")
  ).value;

  data.push({ nationality, author1, title1, author2, title2 });

  renderTableBody(data);
  jsForm.reset();
});

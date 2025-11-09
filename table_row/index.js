/**
 * @type {string[]}
 */
const headers = ["Nemzetiség", "Szerző", "Mű"];

/**
 * @type {{nationality: string, author1: string, title1: string, author2?: string, title2?: string}[]}
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

const form = /** @type {HTMLFormElement} */ (
  document.getElementById("htmlform")
);

form.addEventListener("submit", function (e) {
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
   * @type {{nationality: string, author1: string, title1: string, author2?: string, title2?: string}}
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
});

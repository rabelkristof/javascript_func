/**
 * @type {string[]}
 */
const headers = ["Nemzetiség", "Szerző", "Mű"];

/**
 * @type {CountryWriters[]}
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

let table = createAndAppendElementToParent("table", document.body);
createAndAppendElementToParent("tbody", table);

generateHeader(table, headers);
renderTableBody(table, data);

const htmlForm = /** @type {HTMLFormElement} */ (
  document.getElementById("htmlform")
);

htmlForm.addEventListener("submit", htmlEventListener);

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

  renderTableBody(table, data);
  jsForm.reset();
});

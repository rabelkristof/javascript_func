/**
 * @type {{headers: string[], formData: FormLabelData[]}}
 */
const constantData = {
  headers: ["Nemzetiség", "Szerző", "Mű"],
  formData: [
    { id: "nemzetisegJs", label: "Nemzetiség" },
    { id: "szerzo1Js", label: "Szerző" },
    { id: "mu1Js", label: "Mű" },
    { id: "szerzo2Js", label: "Szerző" },
    { id: "mu2Js", label: "Mű" },
  ],
};

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

let table = createAndAppendTable(
  "jsTBody",
  constantData.headers,
  document.body
);
renderTableBody(table, data);

const htmlForm = /** @type {HTMLFormElement} */ (
  document.getElementById("htmlform")
);

htmlForm.addEventListener("submit", htmlEventListener);

const jsForm = createAndAppendForm(
  "jsForm",
  constantData.formData,
  document.body
);
jsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nationality = /**@type {HTMLInputElement} */ (
    document.getElementById("nemzetisegJs")
  );
  const author1 = /**@type {HTMLInputElement} */ (
    document.getElementById("szerzo1Js")
  );
  const title1 = /**@type {HTMLInputElement} */ (
    document.getElementById("mu1Js")
  );
  const author2 = /**@type {HTMLInputElement} */ (
    document.getElementById("szerzo2Js")
  );
  const title2 = /**@type {HTMLInputElement} */ (
    document.getElementById("mu2Js")
  );

  const errorFields = /** @type {NodeListOf<HTMLSpanElement>} */ (
    jsForm.querySelectorAll(".error")
  );
  for (const error of errorFields) {
    error.innerText = "";
  }

  if (
    validateFields("A mező kitöltése kötelező", nationality, author1, title1)
  ) {
    const nationalityValue = nationality.value;
    const author1Value = author1.value;
    const title1Value = title1.value;
    const author2Value = author2.value;
    const title2Value = title2.value;

    data.push({
      nationality: nationalityValue,
      author1: author1Value,
      title1: title1Value,
      author2: author2Value ? author2Value : undefined,
      title2: title2Value ? title2Value : undefined,
    });

    jsForm.reset();
    renderTableBody(table, data);
  }
});

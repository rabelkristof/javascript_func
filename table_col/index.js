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

const table = document.createElement("table");
document.body.appendChild(table);

const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);

for (const header of headers) {
  const currentHeader = document.createElement("th");
  currentHeader.innerText = header.title;
  if (header.width > 1) currentHeader.colSpan = header.width;

  thead.appendChild(currentHeader);
}

for (const row of rows) {
  const currentRow = document.createElement("tr");
  tbody.appendChild(currentRow);

  const name = document.createElement("td");
  const korszak = document.createElement("td");
  const szerelem1 = document.createElement("td");
  name.innerText = row.name;
  korszak.innerText = row.korszak;
  szerelem1.innerText = row.szerelem1;

  currentRow.appendChild(name);
  currentRow.appendChild(korszak);
  currentRow.appendChild(szerelem1);

  if (row.szerelem2) {
    const szerelem2 = document.createElement("td");
    szerelem2.innerText = row.szerelem2;
    currentRow.appendChild(szerelem2);
  } else {
    szerelem1.colSpan = 2;
  }
}

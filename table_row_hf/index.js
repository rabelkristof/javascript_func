/**
 * @type {{war: string, team1: string, team1Size: string, team2?: string, team2Size?: string}[]}
 */
const arr = [
  {
    war: 'Rákóczi szabadságharc',
    team1: 'Kuruc',
    team1Size: '70.000',
    team2: 'Labanc',
    team2Size: '60.000',
  },
  {
    war: '48-as szabadságharc',
    team1: 'Osztrák császárság (+ Orosz birodalom)',
    team1Size: '170.000 (+ 200.000)',
    team2: 'Magyar királyság',
    team2Size: '170.000',
  },
  {
    war: 'I. világháború',
    team1: 'Antant',
    team1Size: '43 millió',
    team2: 'Központi hatalmak',
    team2Size: '25 millió',
  },
  {
    war: 'Bosworthi csata',
    team1: 'Angolok (York + Lancester)',
    team1Size: '15.000',
  }
];

/**
 * @type {string[]}
 */
const headers = ["Harc megnevezése", "Szembenálló felek", "Haderő"];

const table = document.createElement("table");
const thead = document.createElement("thead");
const trHead = document.createElement("tr");
table.appendChild(thead);
thead.appendChild(trHead);
document.body.appendChild(table);

for (const header of headers) {
  const th = document.createElement("th");
  th.innerText = header;
  trHead.appendChild(th);
}

const tbody = document.createElement("tbody");
table.appendChild(tbody);

for (const row of arr) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);

  const warTd = document.createElement("td");
  const team1Td = document.createElement("td");
  const team1SizeTd = document.createElement("td");
  tr.appendChild(warTd);
  tr.appendChild(team1Td);
  tr.appendChild(team1SizeTd);

  warTd.innerText = row.war;
  team1Td.innerText = row.team1;
  team1SizeTd.innerText = row.team1Size;

  if (row.team2 && row.team2Size) {
    warTd.rowSpan = 2;
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const team2Td = document.createElement("td");
    const team2SizeTd = document.createElement("td");
    tr.appendChild(team2Td);
    tr.appendChild(team2SizeTd);

    team2Td.innerText = row.team2;
    team2SizeTd.innerText = row.team2Size;
  }
}
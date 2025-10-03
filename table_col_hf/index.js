/**
 * @type {{theme: string, time: string, scientist1: string, scientist2: string | undefined}[]}
 */
const arr = [
  {
    theme: 'Optika',
    time: 'XI. szazad',
    scientist1: 'Alhazen'
  },
  {
    theme: 'Asztronómia',
    time: 'reneszánsz',
    scientist1: 'Kepler',
    scientist2: 'Galilei'
  },
  {
    theme: 'Kvantumfizika',
    time: 'XIX-XX. század',
    scientist1: 'Max Planck',
    scientist2: 'Albert Einstein'
  },
  {
    theme: 'Modern fizika',
    time: 'XX-XXI. század',
    scientist1: 'Richard Feynman',
    scientist2: 'Stephen Hawking'
  }
]

const table = document.createElement('table');
const thead = document.createElement('thead');
const tr = document.createElement('tr');
const th1 = document.createElement('th');
const th2 = document.createElement('th');
const th3 = document.createElement('th');

th1.innerText = 'Fizika területe';
th2.innerText = 'Időszak';
th3.innerText = 'Képviselők';
th3.colSpan = 2;

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
table.appendChild(thead);
thead.appendChild(tr);

const tbody = document.createElement('tbody');
table.appendChild(tbody);

for (const row of arr) {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);

  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  td1.innerText = row.theme;
  td2.innerText = row.time;
  td3.innerText = row.scientist1;

  if (row.scientist2) {
    const td4 = document.createElement('td');
    tr.appendChild(td4);
    td4.innerText = row.scientist2;
  } else {
    td3.colSpan = 2;
  }
}

document.body.appendChild(table);
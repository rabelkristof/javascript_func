/**
 * @type {string}
 */
const a = "fasjkdf";
console.log(a);

const b = ["a", "b", "c"];
console.log(b[1]);

for (let i = 0; i < b.length; i++) {
  console.log(b[i]);
}

for (const a of b) {
  console.log(a);
}

for (const key in b) {
  console.log(`${key}: ${b[key]}`);
}

/**
 * @type {{name: string, age: number}}
 */
const y = {
  name: "gomszab",
  age: 24,
};

for (const key in y) {
  console.log(`${key}: ${y[key]}`);
}

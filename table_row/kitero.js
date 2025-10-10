const a = {};
const b = 6;

if (b > 5) {
  a.name = "fdas";
} else {
  a["name"] = "asdf";
}

console.log(a.name);
console.log(a["name"]);
console.log(a.age);
const szam = 1;
valami1();
valami2();
valami3();
const a = valami4(2);
console.log(a);

/**
 * Ez a függvény nem csinál semmi érdekeset.
 * @returns {void}
 */
function valami1() {
  console.log("fdas");
}

/**
 * Kilogolja a globális scope-on lévő szám változót.
 * @returns {void}
 */
function valami2() {
  console.log(szam);
}

/**
 * @returns {void}
 */
function valami3() {
  const num = 2;
  console.log(num);
}

/**
 * @param {number} param Ez a bemeneti paraméter egy szám amihez hozzáadunk mégegy számot.
 * @returns {number}
 */
function valami4(param) {
  const x = 1;
  const y = param + x;

  return y;
}

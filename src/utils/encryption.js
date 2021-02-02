/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */

/**
 * returns a encrypted alpha numberic string.
 * @param {String} e input string that need to encrypt
 * @param {Number} t (optional) number of random salts between 1 and 9 that will added to the input string. Default value is 2.
 */
export const encrypt = (e, t) => {
  t = t || 2;
  try {
    if (!e) throw new Error("input can not be empty. Please enter a string.");
    let r = btoa(e).slice(0, -1),
      n = "",
      o = 0,
      a = "";
    for (let e = 0; e < t; e++)
      (n = getSalt()),
        (o = e % 2 === 0 ? getRandomNumber(0, 9) : -getRandomNumber(1, 9)),
        (a += `${Math.abs(o)}${n.length}`),
        (r = r.slice(0, o) + n + r.slice(o));
    return (r = `${a}-${r}`);
  } catch (e) {
    console.error(e);
  }
};

/**
 * returns a decrypted (original) string that was encrypted.
 * @param {String} e encrypted string that need to decrypt.
 */
export const decrypt = (e) => {
  let t = e.split("-")[0],
    r = e.split("-")[1];
  for (let e = t.length / 2 - 1; e >= 0; e--) {
    let n = parseInt(t[2 * e]),
      o = parseInt(t[2 * e + 1]);
    r =
      e % 2 === 0
        ? r.slice(0, n) + r.slice(n + o)
        : r.slice(0, -(n + o)) + r.slice(-n);
  }
  return (r = "Basic " + r + "=");
  // ,(r = atob(r));
};

export const getRandomNumber = (e, t) =>
  Math.floor(Math.random() * (t - e + 1) + e);

const getSalt = (e = 9, t = 25) =>
  Math.random().toString(t).substr(2, getRandomNumber(1, e));

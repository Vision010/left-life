/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const regx = /\(\)|\[\]|\{\}/
  while (regx.test(s)) {
    s = s.replace(regx, '')
  }
  return s.length === 0
}

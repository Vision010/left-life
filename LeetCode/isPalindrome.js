/**
 * @param {number} x
 * @return {boolean}
 * 暴力做法，=> string => array =reverse> string  => origin === str ?
 */
var isPalindrome = function (x) {
  const origin = `${x}`
  const str = origin.split('').reverse().join('')
  return origin === str
}

var isPalindrome2 = function (x) {
  if (x < 0) {
    return false
  }
  if (x < 10) {
    return true
  }
  let temp = x
  let result = 0
  while (temp !== 0) {
    result = result * 10 + (temp % 10)
    temp = parseInt(temp / 10)
  }
  return result === x
}

console.log(isPalindrome2(-121))

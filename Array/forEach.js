function forEach(array, fnc) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must an Array')
  }

  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  for (let i = 0; i < array.length; i++) {
    fnc(array[i], i, array)
  }
}

Array.prototype.myForEach = function (fnc) {
  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  const array = this

  for (let i = 0; i < array.length; i++) {
    fnc(array[i], i, array)
  }
}

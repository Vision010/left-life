function map(array, fnc) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must an Array')
  }

  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  const newArray = []

  for (let i = 0; i < array.length; i++) {
    newArray.push(fnc(array[i], i, array))
  }

  return newArray
}

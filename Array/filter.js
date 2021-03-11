function filter(array, fnc) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must an Array')
  }

  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }
  const newArray = []

  for (let i = 0; i < array.length; i++) {
    if (fnc(array[i], i, array)) {
      newArray.push(array[i])
    }
  }

  return newArray
}

Array.prototype.myFilter = function (fnc) {
  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  const newArray = []
  const oldArray = this

  for (let i = 0; i < oldArray.length; i++) {
    if (fnc(array[i], i, array)) {
      newArray.push(oldArray[i])
    }
  }

  return newArray
}

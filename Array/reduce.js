function reduce(array, fnc, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must an Array')
  }

  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  // 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
  if (array.length === 0) {
    throw new Error('array.length is 0')
  }
  if (!initialValue) {
    initialValue = array[0]
  }

  for (let i = 0; i < array.length; i++) {
    initialValue = fnc(initialValue, array[i], i, array)
  }

  return initialValue
}

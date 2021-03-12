// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
function some(array, fnc) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must an Array')
  }

  if (typeof fnc !== 'function') {
    throw new TypeError('fnc must a function')
  }

  let flag = false

  for (let i = 0; i < array.length; i++) {
    flag = !!fnc(array[i], i, array)
  }

  return flag
}

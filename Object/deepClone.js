function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  const newObj = {}

  for (let key in obj) {
    newObj[key] = deepClone(obj[key])
  }

  return newObj
}

function shallowClone(obj) {
  const newObj = {}
  for (let key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}

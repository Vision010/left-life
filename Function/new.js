function myNew(constructor, ...args) {
  const obj = {}
  obj.__proto__ = constructor.prototype
  constructor.apply(obj, args)
  return obj
}

function Test(value, name) {
  this.value = value
  this.name = name
  this.getString = function () {
    console.log(this.value, 'value')
    console.log(this.name, 'name')
  }
}

new Test('aaaa').getString()

myNew(Test, 'ssss').getString()

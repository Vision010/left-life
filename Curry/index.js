const add = (x) => (y) => (z) => x + y + z

// function curry(fn) {
//   return function () {
//     const args = arguments
//     return args.length >= arguments.length - 1 ? fn.apply(this, args) :
//   }
// }

function add2(x) {
  function add(y) {
    return add2(x + y)
  }

  add.toString = function () {
    return x
  }

  return add
}

function curryAdd() {
  const args = [...arguments]

  const add = (...rest) => {
    args.push(...rest)
    return add
  }

  add.toString = () => {
    return args.reduce((a, b) => a + b)
  }

  return add
}

console.log(curryAdd(1,2,3)(2)(10), 'sss')

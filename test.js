// const p = new Promise((resolve, reject) => {
//   reject('err')
// }).catch(() => console.log(1)).then(() => console.log(2))

// p.catch(() => console.log(3)).then(() => console.log(4))

// function b() {
//   a = function () {
//     console.log('object')
//   }
//   return this
// }

// b.prototype.a = function () {
//   console.log('object2')
// }

// console.log(new new b().a())

// function Foo() {
//   getName = function () {
//     console.log('1')
//   }
//   return this
// }
// Foo.getName = function () {
//   console.log('2')
// }
// Foo.prototype.getName = function () {
//   console.log('3')
// }
// var getName = function () {
//   console.log('4')
// }
// function getName() {
//   console.log('5')
// }

// Foo.getName() //2
// getName() //4
// Foo().getName() //1
// getName() // 1
// new Foo.getName() //2
// new Foo().getName() //3
// new new Foo().getName() //3

// [2,3]

// 8

// 2 -> 6 -> {
//   2 -> 4 {
//     2 ->2
//   }
//   3 -> 3
// }
// 3 -> 5 {
//   2 -> 3
//   3 -> 2
// }

// 2,2,2,2
// 2,3,3
// 3,2,3
// 3,3,2
// 2, 3, 4, 5, 6, 7, 8
// 1, 2,

const a = [2,3]


function computed(arrays, target) {
  const dp = new Array(target + 1).fill(-1)
  dp[0] = 0
  for (let item of arrays) {
    for (let i = item; i <= target; i++) {
      dp[i] = Math.max(dp[i], dp[i - item] + 1)
      console.log(dp[i], `当前: ${i}, ${item}`);
    }
  }

  return dp[target] === -1 ? -1 : dp[target]
}


console.log(computed(a, 8));
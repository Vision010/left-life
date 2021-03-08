function Person() {

}

const person = new Person()

// 实例对象的 __proto__ = 函数对象的 prototype
console.log(person.__proto__ === Person.prototype); // true

// 函数对象的 prototype 的 __proto__ =  Object 的 prototype
console.log(Person.prototype.__proto__ === Object.prototype); // true

// 所以推断出 
console.log(person.__proto__.__proto__ === Object.prototype); // true

console.log(person.__proto__.__proto__.__proto__); // null

console.log(Object.prototype.__proto__); // null
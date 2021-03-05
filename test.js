function Foo() {
  getName = function () {
    console.log(1)
  }
  return this
}

Foo.prototype.getName = function () {
  console.log(3)
}

Foo.getName = function () {
    console.log(2)
  }

Foo().getName()

function getName() {
  console.log(5)
}

new Foo().getName() // ?

Foo.getName()

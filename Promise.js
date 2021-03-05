var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'

function _Promise(execute) {
  var that = this
  that.state = PENDING
  that.onFulfilledFn = []
  that.onRejectedFn = []

  function resolve(value) {
    setTimeout(function () {
      if (that.state === PENDING) {
        that.state = FULFILLED
        that.value = value
        that.onFulfilledFn.forEach(function (f) {
          f(that.value)
        })
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      if (that.state === PENDING) {
        that.state = REJECTED
        that.reason = reason
        that.onRejectedFn.forEach(function (f) {
          f(that.reason)
        })
      }
    })
  }
  try {
    execute(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
_Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function (x) {
          return x
        }
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (e) {
          throw e
        }
  var that = this
  var promise
  if (that.state === FULFILLED) {
    promise = new _Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onFulfilled(that.value)
          resolvePromise(promise, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  if (that.state === REJECTED) {
    promise = new _Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onRejected(that.reason)
          resolvePromise(promise, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  if (that.state === PENDING) {
    promise = new _Promise(function (resolve, reject) {
      that.onFulfilledFn.push(function () {
        try {
          var x = onFulfilled(that.value)
          resolvePromise(promise, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
      that.onRejectedFn.push(function () {
        try {
          var x = onRejected(that.reason)
          resolvePromise(promise, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  return promise
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('x 不能与 promise 相等'))
  }
  if (x instanceof _Promise) {
    if (x.state === FULFILLED) {
      resolve(x.value)
    } else if (x.state === REJECTED) {
      reject(x.reason)
    } else {
      x.then(function (y) {
        resolvePromise(promise, y, resolve, reject)
      }, reject)
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    var executed
    try {
      var then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          function (y) {
            if (executed) return
            executed = true
            resolvePromise(promise, y, resolve, reject)
          },
          function (e) {
            if (executed) return
            executed = true
            reject(e)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (executed) return
      executed = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

module.exports = {
  deferred() {
    var resolve
    var reject
    var promise = new _Promise(function (res, rej) {
      resolve = res
      reject = rej
    })
    return {
      promise,
      resolve,
      reject,
    }
  },
}

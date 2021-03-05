/**
 * 1. 用new Promise实例化的promise对象有以下三个状态
 * 2. 一个 promise 必须提供一个 then 方法以访问其当前值、最终返回值和据因
 * 3. onFulfilled 和 onRejected 都是可选参数
 * 4. onFulfilled 和 onRejected 直到执行环境堆栈尽包含平台代码前不可被调用
 * 5. onFulfilled 和 onRejected 必须被作为函数调用
 * 6. then 方法可以被同一个 promise 调用多次
 * 7. then 方法必须返回一个 promise 对象
 *
 * 8. Promise解决程序是一个抽象的操作，其需输入一个 promose 和一个值，我们表示为 [[Resolve]](promise, x)，
 * 如果 x 是 thenable 的，同时若 x 至少满足和 promise 类似（即鸭子类型， x 拥有部分或全部 promise 拥有的方法属性）的前提，
 * 解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class _Promise {
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onFulfillCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof _Promise) {
        value.then(resolve, reject)
        return
      }
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value

        this.onFulfillCallbacks.forEach((fnc) => fnc())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason

        this.onRejectedCallbacks.forEach((fnc) => fnc())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    //prettier-ignore
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data
    //prettier-ignore
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }

    const promise2 = new _Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.onFulfillCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
      return reject(new TypeError('x 不能与 promise 相等'))
    }
    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let executed = false
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (executed) return
              executed = true
              this.resolvePromise(promise, y, resolve, reject)
            },
            (e) => {
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
}

_Promise.deferred = function () {
  const result = {}
  result.promise = new _Promise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = _Promise

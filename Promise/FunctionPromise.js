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
 * ! 需要注意 this 指向问题
 * * 用 settimeout 模拟异步任务
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function _Promise(exector) {
  const that = this
  that.state = PENDING
  that.value = null
  that.reason = null

  that.onFulfilleds = []
  that.onRejecteds = []

  const resolve = (value) => {
    if (that.state === PENDING) {
      that.state = FULFILLED
      that.value = value

      that.onFulfilleds.forEach((fnc) => {
        fnc()
      })
    }
  }

  const reject = (reason) => {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.reason = reason

      that.onRejecteds.forEach((fnc) => {
        fnc()
      })
    }
  }

  try {
    exector(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

_Promise.prototype.then = function (onFulfilled, onRejected) {
  //prettier-ignore
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data
  //prettier-ignore
  onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }

  const _prmoise = new _Promise((resolve, reject) => {
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(_prmoise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)
    } else if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(_prmoise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)
    } else {
      this.onFulfilleds.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(_prmoise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      })

      this.onRejecteds.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(_prmoise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
    }
  })

  return _prmoise
}

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    return reject(new TypeError('x === promise'))
  }

  if (x && (typeof x === 'object' || typeof x === 'function')) {
    let executed = false
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (executed) return
            executed = true
            resolvePromise(promise, value, resolve, reject)
          },
          (reason) => {
            if (executed) return
            executed = true
            reject(reason)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (executed) return
      executed = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

_Promise.deferred = function () {
  var result = {}
  result.promise = new _Promise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = _Promise

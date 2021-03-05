function debounce(fnc, wait) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const that = this
    const args = arguments
    timer = setTimeout(function () {
      fnc.apply(that, args)
    }, wait)
  }
}

function debounce2(fnc, wait) {
  let timer = null

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fnc(...args)
    }, wait)
  }
}

const debounce3 = (fnc, wait) => {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fnc(...args)
    }, wait)
  }
}

function debounce4(fnc, wait, immediate) {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let flag = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)

      if (flag) {
        fnc(...args)
      }
    } else {
      timer = setTimeout(() => {
        fnc(...args)
      }, wait)
    }
  }
}

function debounceOnCancel(fnc, wait, immediate) {
  let timer = null

  const debounce = function () {
    const that = this
    const args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      let flag = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)

      if (flag) {
        fnc.apply(that, args)
      }
    } else {
      timer = setTimeout(() => {
        fnc.apply(that, args)
      }, wait)
    }
  }

  debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounce
}

function test(a, b) {
  console.log(a)
  console.log(b)
}

const aa = debounce4(test, 2000, true)

aa('ssss', '111')
aa('222', '111')
aa('333', '111')

setTimeout(() => {
  aa('444', '111')
}, 2000)

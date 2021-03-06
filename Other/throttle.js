/**
 * 每隔一段时间，只执行一次事件。
 * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
 * leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
 * 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 */

function throttle(fnc, wait) {
  let pre = 0
  return function () {
    const now = +new Date()
    if (now - pre > wait) {
      fnc.apply(this, arguments)
      pre = now
    }
  }
}

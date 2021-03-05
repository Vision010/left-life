Function.prototype.myBind = function (context, ...rest) {
  const that = this
  return function () {
    return that.apply(context, [...rest])
  }
}

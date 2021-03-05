Function.prototype.myApply = function (context, array) {
  const ctx = context || window
  ctx.fn = this

  let result

  if (!array) {
    result = ctx.fn()
  } else {
    const args = []
    // 因为 array 可能是一个类数组 ({a:2,length:1})，所以需要转换成一个“真数组”
    for (let i = 0; i < array.length; i++) {
      args.push(array[i])
    }
    result = eval('ctx.fn(' + args + ')')
  }
  delete ctx.fn
  return result
}

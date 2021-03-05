Function.prototype.myCall = function (context) {
  const ctx = context || window
  ctx.fn = this
  const args = []
  for (let i = 1; i< arguments.length; i++) {
    args.push(arguments[i])
  }
  const result = eval('ctx.fn(' + args + ')')
  delete ctx.fn
  return result
}

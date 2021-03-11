/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let item of coins) {
    for (let i = item; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - item] + 1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}

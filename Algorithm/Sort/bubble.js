const array = [2, 3, 5, 12, 3, 21, 13, 233]

function bubble(arr) {
  const swap = (x, y) => {
    const temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        swap(i, j)
      }
    }
  }

  return arr
}

console.log(bubble(array))

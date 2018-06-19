import { postData } from './type'

const bubbleSort = (data: postData[]) => {
  //
  const len = data.length

  for (let i = len - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      // if LHS > RHS
      // @ts-ignore
      if (data[j - 1].points > data[j].points) {
        let temp = data[j - 1]
        data[j - 1] = data[j]
        data[j] = temp
      }
    }
  }
  return data
}

export { bubbleSort }

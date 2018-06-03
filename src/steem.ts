import { client } from '.'

const calcRep: (rep: number) => number = rep => {
  let result = Math.log10(Math.abs(rep))
  if (isNaN(result)) result = 0
  result = Math.max(result - 9, 0)
  let sign = Math.sign(rep) === -1 ? -1 : 1
  result = sign * result
  result = result * 9 + 25
  return result
}

export { calcRep }

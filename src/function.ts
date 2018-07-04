import { postData } from './type'
import { logger } from '.'
import { calcRep } from './steem'
import asyncForEach from './aync'

// This funciton should return violated users that submitted multiple post
const checkUnique: (
  data: postData[]
) => { violated: string[]; data: postData[]; vArray: postData[] } = (data: postData[]) => {
  let tempArr: string[] = []
  let violated: string[] = []
  let vArray: postData[] = []

  let nd = data.filter((d, key) => {
    if (tempArr.indexOf(data[key].author) < 0) {
      tempArr.push(data[key].author)
      return true
    } else {
      violated.push(data[key].author)
      vArray.push(d)
      return false
    }
  })

  let res = data.filter(d => {
    if (violated.indexOf(d.author) < 0) {
      return true
    } else {
      vArray.push(d)
      return false
    }
  })

  // logger.info('res:')
  // logger.info(res.length)
  return {
    violated: violated,
    vArray,
    data: res
  }
}

// This function check for reputation
const checkRep: (data: postData[]) => Promise<{ violated: string[]; data: postData[] }> = async (
  data: postData[]
) => {
  let violated: string[] = []
  let nd: postData[] = data.filter(d => {
    let rep = calcRep(d.reputation)
    if (rep < 40) {
      violated.push(d.author)
      return false
    }
    return true
  })
  return { violated: violated, data: nd }
}

// This function check title
const checkTitle: (
  data: postData[],
  title: string
) => { data: postData[]; violated: postData[] } = (data: postData[], title: string) => {
  let res: postData[] = []
  let violated: postData[] = []
  data.map(d => {
    if (title.match(d.title.toLowerCase())) {
      res.push(d)
    } else {
      violated.push(d)
    }
  })

  return { violated, data: res }
}

const removeDecoration = (body: string) => {
  // remove **
  let res = body
    .split('')
    .filter((s: string) => !s.match(/[\*\_]/))
    .join('')

  // remove table
  res = res
    .split(/<[^>]*>/)
    .filter((s: string) => !s.match(/<[^>]*>/))
    .join(' ')

  return res
}

export { checkUnique, checkRep, checkTitle, removeDecoration }

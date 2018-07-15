import { postData, extractedData, country, match } from './type'
import { logger } from '.'
import { removeDecoration } from './function'

const extractMain: (
  data: postData[]
) => Promise<{ violated: postData[]; data: postData[] }> = async (data: postData[]) => {
  let violated: postData[] = []

  let nd = data
    .map(d => {
      // make everything lower case for the ease of developing
      let body = d.body.toLowerCase()
      let nb: extractedData
      try {
        nb = extractBody(body)
        d.match = nb
      } catch (err) {
        try {
          nb = extractBody(removeDecoration(body))
          d.match = nb
        } catch (err) {
          logger.error(d.link)
          // logger.error(err)
          d.match = []
          d.error = `${err}`
          violated.push(d)
        }
      } finally {
        return d
      }
    })
    .filter(d => !d.error)

  nd = nd.filter(d => {
    //@ts-ignore
    if (d.match.every(i => i === 'o')) {
      violated.push(d)
      return false
    } else {
      return true
    }
  })

  return { violated: violated, data: nd }
}

const extractBody: (body: string) => extractedData = (body: string) => {
  let matchData: extractedData = []
  // France vs Argentina first
  let tempChunk = body
    .toLowerCase()
    .split(/[0-9]+[* |\t\n]+france+[*| \t\n]+[v, vs, \n]+[* |\t\n]+belgium+[* |\t\n]+[0-9]/)[0]
  let tempBody: string = body.toLowerCase().slice(tempChunk.length, body.length)
  // loop for number of country
  for (let i = 0; i < country.length; i++) {
    let c = country[i].split(' vs ')
    let fc = c[0].toLowerCase()
    let sc = c[1].toLowerCase()
    let { body: chunk, match } = eachCountryFilter(tempBody, fc, sc)
    tempBody = chunk
    matchData.push(match)
  }
  return matchData
}

const eachCountryFilter = (filteredBody: string, firstCountry: string, secondCountry: string) => {
  // chunkA
  // [chunkA][uruguay vs portugal (chunkB)]
  // uruguay vs portugal[chunkC]
  let chunkA: string, chunkB: string, chunkC: string
  let firstLoc: number, secondLoc: number
  let firstCond: number, secondCond: number
  let finalCond: match = []

  // First Country
  // get the first country location
  let tempLoc1 = filteredBody.match(firstCountry)
  if (!tempLoc1 || typeof tempLoc1.index !== 'number') {
    console.log(firstCountry)
    // console.log(filteredBody)
    throw 'COUNTRY_NOT_FOUND_1'
  }
  // Get the first country condition
  firstLoc = tempLoc1.index
  chunkA = filteredBody.slice(0, firstLoc)
  chunkB = filteredBody.slice(firstLoc, filteredBody.length)
  firstCond = findRes(chunkA, true)

  // Second Country
  // Get the second country location
  let tempLoc2 = chunkB.match(secondCountry)
  if (!tempLoc2 || typeof tempLoc2.index !== 'number') {
    console.log(firstCountry)
    console.log(secondCountry)
    throw 'COUNTRY_NOT_FOUND_2'
  }
  // Get the second country condition
  secondLoc = tempLoc2.index
  chunkC = chunkB.slice(secondLoc + secondCountry.length, chunkB.length)
  secondCond = findRes(chunkC, false)

  // Check condition
  finalCond[0] = firstCond
  finalCond[1] = secondCond

  if (firstCond > secondCond) {
    // LHS win
    finalCond[2] = 'w'
  } else if (firstCond < secondCond) {
    // RHS win
    finalCond[2] = 'l'
  } else {
    // Draw/Tie
    finalCond[2] = 't'
  }

  // if ((firstCond === 't' && secondCond === 't') || (firstCond === 'd' && secondCond === 'd')) {
  //   finalCond = 't'
  // } else if (firstCond === 'w' && secondCond === 'l') {
  //   finalCond = 'w'
  // } else if (firstCond === 'l' && secondCond === 'w') {
  //   finalCond = 'l'
  // } else {
  //   // console.log(firstCountry)
  //   // console.log(secondCountry)
  //   // console.log(firstCond)
  //   // console.log(secondCond)
  //   finalCond = 'o'
  // }

  return {
    body: chunkC,
    match: finalCond
  }
}

const findRes: (chunk: string, reverse?: boolean) => number = (
  chunk: string,
  reverse: boolean = false
) => {
  if (reverse) {
    let revArr = chunk.split('').reverse()
    for (let i = 0; i < revArr.length; i++) {
      // 2 | anitnegra | sv | ecnarf | 1
      const temp: number = parseInt(revArr[i])
      if (!isNaN(temp)) {
        return temp
      }
    }
    throw 'NO_CONDITION_FOUND'
  } else {
    let arr = chunk.split('')
    for (let i = 0; i < arr.length; i++) {
      // 1 | france | vs | argentina | 2
      const temp: number = parseInt(arr[i])
      if (!isNaN(temp)) {
        return temp
      }
    }
    throw 'NO_CONDITION_FOUND'
  }
}

export default extractMain
export { extractBody, findRes }

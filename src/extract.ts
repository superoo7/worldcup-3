import { postData, extractedData, country, match } from './type'
import { logger } from '.'

const extractMain: (data: postData[]) => { violated: string[]; data: postData[] } = (
  data: postData[]
) => {
  let violated: string[] = []
  let nd = data.map(d => {
    // make everything lower case for the ease of developing
    let body = d.body.toLowerCase()
    let nb: extractedData
    try {
      nb = extractBody(body)
      d.match = nb
    } catch (err) {
      logger.error(err)
      violated.push(d.url)
      d.match = []
    }
    return d
  })

  return { violated: violated, data: nd }
}

const extractBody: (body: string) => extractedData = (body: string) => {
  let matchData: extractedData = []
  // Russia and Saudi Arab first
  let tempChunk = body
    .toLowerCase()
    .split(/[t,w,l]+[* |]+russia+[ |]+[v, vs]+[ |]+saudi arabia+[* |]+[l,w,t]/)[0]

  let tempBody: string = body.toLowerCase().slice(tempChunk.length, body.length)

  // create a for loop of 48 times (48 matches)
  for (let i = 0; i < 48; i++) {
    let c = country[i].split(' v ')
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
  // [chunkA][italy v australia (chunkB)]
  // italy v australia[chunkC]
  let chunkA: string, chunkB: string, chunkC: string
  let firstLoc: number, secondLoc: number
  let firstCond: string, secondCond: string
  let finalCond: match

  // First Country
  // get the first country location
  let tempLoc1 = filteredBody.match(firstCountry)
  if (!tempLoc1 || typeof tempLoc1.index !== 'number') {
    console.log(firstCountry)
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
    console.log(secondCountry)
    throw 'COUNTRY_NOT_FOUND_2'
  }
  // Get the second country condition
  secondLoc = tempLoc2.index
  chunkC = chunkB.slice(secondLoc + secondCountry.length, chunkB.length)
  secondCond = findRes(chunkC, false)

  // Check condition
  if (firstCond === 't' && secondCond === 't') {
    finalCond = 't'
  } else if (firstCond === 'w' && secondCond === 'l') {
    finalCond = 'w'
  } else if (firstCond === 'l' && secondCond === 'w') {
    finalCond = 'l'
  } else {
    console.log(firstCountry)
    console.log(secondCountry)
    console.log(firstCond)
    console.log(secondCond)
    // console.log(chunkA)
    // console.log(chunkB)
    throw 'INVALID_LOGIC_OF_COND'
  }

  return {
    body: chunkC,
    match: finalCond
  }
}

const findRes: (chunk: string, reverse?: boolean) => string = (
  chunk: string,
  reverse: boolean = false
) => {
  if (reverse) {
    let revArr = chunk.split('').reverse()
    for (let i = 0; i < revArr.length; i++) {
      if (revArr[i] === 't' || revArr[i] === 'w' || revArr[i] === 'l') {
        return revArr[i]
      }
    }
    throw 'NO_CONDITION_FOUND'
  } else {
    let arr = chunk.split('')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 't' || arr[i] === 'w' || arr[i] === 'l') {
        return arr[i]
      }
    }
    throw 'NO_CONDITION_FOUND'
  }
}

export default extractMain
export { extractBody, eachCountryFilter, findRes }

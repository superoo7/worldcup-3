import { postData, extractedData, country, match } from './type'
import { logger } from '.'

const extractMain: (
  data: postData[]
) => Promise<{ violated: postData[]; data: postData[] }> = async (data: postData[]) => {
  let violated: postData[] = []

  let nd = data
    .map(d => {
      // make everything lower case for the ease of developing
      let body = removeDecoration(d.body.toLowerCase())

      let nb: extractedData
      try {
        nb = extractBody(body)
        d.match = nb
      } catch (err) {
        // logger.error(d.url)
        // logger.error(err)
        d.match = []
        d.error = `${err}`
        violated.push(d)
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
  // Russia and Saudi Arab first
  let tempChunk = body
    .toLowerCase()
    .split(/[t,w,l]+[* |\t]+russia+[*| \t]+[v, vs]+[* |\t]+saudi arabia+[* |\t]+[l,w,t]/)[0]
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
    // console.log(firstCountry)
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
    // console.log(firstCountry)
    // console.log(secondCountry)
    throw 'COUNTRY_NOT_FOUND_2'
  }
  // Get the second country condition
  secondLoc = tempLoc2.index
  chunkC = chunkB.slice(secondLoc + secondCountry.length, chunkB.length)
  secondCond = findRes(chunkC, false)

  // Check condition
  if ((firstCond === 't' && secondCond === 't') || (firstCond === 'd' && secondCond === 'd')) {
    finalCond = 't'
  } else if (firstCond === 'w' && secondCond === 'l') {
    finalCond = 'w'
  } else if (firstCond === 'l' && secondCond === 'w') {
    finalCond = 'l'
  } else {
    // console.log(firstCountry)
    // console.log(secondCountry)
    // console.log(firstCond)
    // console.log(secondCond)
    finalCond = 'o'
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
      // >dt< >dt/<
      if (
        revArr[i] === 't' &&
        i !== revArr.length - 1 &&
        (revArr[i + 1] === '/' || revArr[i + 1] === '<')
      ) {
      } else if (revArr[i] === 't' || revArr[i] === 'd' || revArr[i] === 'w' || revArr[i] === 'l') {
        return revArr[i]
      }
    }
    throw 'NO_CONDITION_FOUND'
  } else {
    let arr = chunk.split('')
    for (let i = 0; i < arr.length; i++) {
      // <td> </td>
      if (arr[i] === 't' && i !== arr.length - 1 && arr[i + 1] === 'd') {
      } else if (arr[i] === 't' || arr[i] === 'd' || arr[i] === 'w' || arr[i] === 'l') {
        return arr[i]
      }
    }
    throw 'NO_CONDITION_FOUND'
  }
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

export default extractMain
export { extractBody, eachCountryFilter, findRes, removeDecoration } // extractPromise }

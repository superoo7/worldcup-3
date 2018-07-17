// Library
const steem = require('steem')
const logger = require('winston')
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { Client, DatabaseAPI } from 'dsteem'
// @ts-ignore
import * as steem from 'steem'

// Files
import getData from './sql'
import { postData, match } from './type'
import { checkUnique, checkRep, checkTitle, removeDecoration } from './function'
import extractMain, { extractBody } from './extract'
import { comment } from './steem'
import { bubbleSort } from './algorithm'

// Initialize
dotenv.config()
const client = new Client('https://api.steemit.com')
const db = new DatabaseAPI(client)
const getDataFromSQL: boolean = process.env.data ? true : false

// Main
const main: () => void = async () => {
  if (getDataFromSQL) {
    await getData()
    logger.info('Get data from SteemSQL')
  } else {
    let data: [postData] = await readFile()
    logger.info(`Amount of data: ${data.length}`)

    // #1 Check reputation
    let { violated: violated1, data: nd1 } = await checkRep(data)
    logger.info('================================================================================')
    logger.info('Type: Check Author Reputation')
    logger.info(`Total author violated: ${violated1.length}`)
    logger.info(`Filtered left data: ${nd1.length}`)
    logger.info('================================================================================')
    fs.writeFile('./violated1.json', JSON.stringify(violated1), () => {})

    // #2 Extract out all matches prediction
    let { violated: violated2, data: nd2 } = await extractMain(nd1)
    logger.info('================================================================================')
    logger.info('Type: Extracting Data')
    logger.info(`Total author violated: ${violated2.length}`)
    logger.info(`Filtered left data: ${nd2.length}`)
    logger.info('================================================================================')
    fs.writeFile('./violated2.json', JSON.stringify(violated2), () => {})

    // #3 Check Uniqueness
    // Extracted the new data after removing duplicate entries
    let { violated: violated3, data: nd3, vArray } = checkUnique(nd2)
    logger.info('================================================================================')
    logger.info('Type: Check Unique Post')
    logger.info(`Total authors: ${violated3.length}`)
    logger.info(`Total posts: ${vArray.length}`)
    logger.info(`Filtered left data: ${nd3.length}`)
    logger.info('================================================================================')
    fs.writeFile('./violated3.json', JSON.stringify(vArray), () => {})
    fs.writeFile('./success.json', JSON.stringify(nd3), () => {})
  }
}

const readFile: () => [postData] = () => {
  let mode: string = process.env.NODE || 'dev'
  let file = mode.toLowerCase() == 'dev' ? './sample.json' : 'output.json'
  let data = fs.readFileSync(file, 'utf-8')
  return JSON.parse(data)
}

// test a single post
const singlePost = () => {
  let url = `https://steemd.com/blocktradesworldcup/@neyi24/the-blocktrades-world-cup-or-my-selections-for-the-last-16`
  let author = url.split('/')[4]
  author = author.slice(1, author.length)
  let permlink = url.split('/')[5]

  steem.api.getContent(author, permlink, function(err: any, result: any) {
    const body = result.body.toLowerCase()
    let test = extractBody(body)
    logger.info(test)
  })
}

function sendMessage(message: string, author: string, permlink: string) {
  const newMessage: string =
    `There is some issues with your entry for blocktrades World Cup contest, where I am not able to extract out your contest entry data.<br><br>The error name is: ` +
    message +
    `<br><hr>This is an automated message script written by [superoo7](https://steemit.com/@superoo7).<br>For more details about your error, please refer to the [development post](https://steemit.com/blocktradesworldcup/@superoo7/development-extracting-data-of-blocktrades-world-cup)`
  const username = process.env.STEEMNAME || 'superoo7-dev'
  const posting = process.env.STEEMPOSTING || 'abc'
  comment(username, posting, author, permlink, newMessage, steem)
}

// winners ranking
const getWinners = async () => {
  // get result of matches
  const country: match[] = [
    // [4, 3, 'w'], // 'France vs Argentina'
    [4, 2, 'w'], // 'France vs Croatia'
    [2, 0, 'w'] // 'Belgium vs England'
  ]

  const d = await fs.readFileSync('./success.json', 'utf-8')
  const data: postData[] = JSON.parse(d)
  let res = data.map(d => {
    d.points = 0
    country.map((c, k) => {
      if (!!d.match && c[0] === d.match[k][0] && c[1] === d.match[k][1]) {
        // If predicted exact score
        // @ts-ignore
        d.points = d.points + 3
      } else if (!!d.match && c[2] === d.match[k][2]) {
        // If predicted win/lose cond
        // @ts-ignore
        d.points = d.points + 1
      }
    })
  })

  // Bubble sort algorithm
  let finalData = await bubbleSort(data)
  fs.writeFile('./ranking.json', JSON.stringify(finalData), () => {})
  generateTable(finalData.reverse())
}

const generateTable = (data: postData[]) => {
  let resMd = '|Author|URL|Points|\n|:---:|:---:|:---:|\n'
  resMd += data.map(d => `|@${d.author}|[post](${d.link})|${d.points}|`).join('\n')
  fs.writeFile('./currentResult.md', resMd, () => {})

  let resCSV = 'Author,URL,Points\n'
  resCSV += data.map(d => `${d.author},${d.link},${d.points}`).join('\n')
  fs.writeFile('./currentResult.csv', resCSV, () => {})
}

// Start main

if (process.env.NODE === 'TEST') {
} else {
  // main()
  // singlePost()
  getWinners()
}

export { logger, client, readFile, sendMessage }

// Library
const steem = require('steem')
const logger = require('winston')
import dotenv from 'dotenv'
import fs from 'fs'
import { Client, DatabaseAPI } from 'dsteem'

// Files
import getData from './sql'
import { postData } from './type'
import { checkUnique, checkRep } from './function'

// Initialize
dotenv.config()
const client = new Client('https://api.steemit.com')
const db = new DatabaseAPI(client)
const getDataFromSQL: boolean = false

// Main
const main: () => void = async () => {
  if (getDataFromSQL) {
    await getData()
    logger.info('Get data from SteemSQL')
  }
  let data: [postData] = await readFile()
  logger.info(`Amount of data: ${data.length}`)

  // #1 Check Uniqueness
  // Extracted the new data after removing duplicate entries
  let { violated: violated1, data: nd1 } = checkUnique(data)
  logger.info(violated1)

  // #2 Check reputation
  let { violated: violated2, data: nd2 } = await checkRep(nd1)
  logger.info(violated2)
  logger.info(`Filtered left data: ${nd2.length}`)
}

const readFile: () => [postData] = () => {
  let mode: string = process.env.NODE || 'dev'
  let file = mode.toLowerCase() == 'dev' ? './sample.json' : 'output.json'
  let data = fs.readFileSync(file, 'utf-8')
  return JSON.parse(data)
}

// Start main
main()

export { logger, client }

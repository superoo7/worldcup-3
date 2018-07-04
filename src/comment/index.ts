import * as fs from 'fs'

import { logger, sendMessage } from '..'
import { postData, extractedData } from '../type'

const extractPromise = (data: postData[]) => {
  var interval = 30 * 1000 // 17 seconds;

  data.map((d, i) =>
    setTimeout(
      i => {
        console.log(d.error)
        sendMessage(`${d.error}`, d.author, d.permlink)
      },
      interval * i,
      i
    )
  )
}

async function a() {
  logger.info('start')
  let data = readAFile()
  console.log(data.length)
  extractPromise(data)
}

const readAFile: () => [postData] = () => {
  let file = './violated.json'
  let data = fs.readFileSync(file, 'utf-8')
  return JSON.parse(data)
}

a()

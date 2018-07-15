import executeQuery from './db'
import * as fs from 'fs'

const query = `
SELECT
  'https://steemit.com' + url AS link,
  author,
  title,
  created,
  last_update,
  body,
  author_reputation
FROM
  Comments
WHERE
  depth = 0 AND
  Comments.created > '2018-07-08 03:42:30' AND
  Comments.created < '2018-07-10 17:59:00' AND
  Comments.last_update < '2018-07-10 17:59:00' AND
  CONTAINS(Comments.json_metadata, 'blocktradesworldcup') AND
  CONTAINS(Comments.json_metadata, 'mypicks')
`

const getData: () => any = async () => {
  let data: any = await executeQuery(query)
  fs.writeFile('./output.json', JSON.stringify(data), 'utf-8', callback)
}

const callback: (err: any) => void = err => {
  console.error(`Error from saving files`)
}

export default getData

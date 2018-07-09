import executeQuery from './db'
import * as fs from 'fs'

const query = `
SELECT
  'https://steemit.com' + Comments.url AS link,
  Comments.author,
  Comments.title,
  Comments.created,
  Comments.last_update,
  Comments.body,
  Accounts.reputation
FROM
  Comments
LEFT JOIN Accounts ON Comments.author = Accounts.name
WHERE
  depth = 0 AND
  Comments.created > '2018-07-03 21:18:12' AND
  Comments.created < '2018-07-06 13:59:00' AND
  Comments.last_update < '2018-07-06 13:59:00' AND
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

import executeQuery from './db'
import fs from 'fs'

const query = `
SELECT
  Comments.author,
  Accounts.reputation,
  Comments.permlink,
  Comments.json_metadata,
  Comments.created,
  Comments.last_update,
  'https://steemit.com/' + Comments.parent_permlink + '/@' + Comments.author + '/' + Comments.permlink  as url,
  Comments.body
FROM Comments
LEFT JOIN Accounts ON Comments.author = Accounts.name
WHERE
  Comments.depth = '0' AND
  CONTAINS(Comments.json_metadata, 'blocktradesworldcup') AND
  CONTAINS(Comments.json_metadata, 'mypicks') AND
  Comments.last_update < '2018/06/14'
`

const getData: () => any = async () => {
  let data: any = await executeQuery(query)
  fs.writeFile('./output.json', JSON.stringify(data), 'utf-8', callback)
}

const callback: (err: any) => void = err => {
  console.error(`Error from saving files`)
}

export default getData

import { client } from '.'

const calcRep: (rep: number) => number = rep => {
  let result = Math.log10(Math.abs(rep))
  if (isNaN(result)) result = 0
  result = Math.max(result - 9, 0)
  let sign = Math.sign(rep) === -1 ? -1 : 1
  result = sign * result
  let reputation = result * 9 + 25
  return reputation
}

// i = 10^((rep - 25) / 9 + 9)

const comment = async (
  username: string,
  posting: string,
  author: string,
  permlink: string,
  message: string,
  steem: any
) => {
  return await new Promise((resolve, reject) => {
    return steem.broadcast.comment(
      posting,
      author,
      permlink,
      username,
      randomName(10),
      '',
      message,
      {
        tags: ['teammalaysiadevtest', 'teammalaysia'],
        app: 'superoo7/0.1'
      },
      (err: any, result: any) => {
        console.log(err, result)
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// randomName: Generate random name
let randomName = (n: number): string => {
  let text: string = ''
  let possible: string = 'abcdefghijklmnopqrstuvwxyz1234567890'

  for (var i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export { calcRep, comment }

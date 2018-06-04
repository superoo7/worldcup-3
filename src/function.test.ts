import {} from 'jest'

import { postData } from './type'
import { checkUnique } from './function'

describe('test function', () => {
  it('check for uniqueness', () => {
    let sampleData: postData[] = [
      {
        author: 'a',
        reputation: 123,
        permlink: 'aaa',
        json_metadata: '',
        created: '2018-05-31T23:20:06.000Z',
        last_update: '2018-05-31T23:20:06.000Z',
        url: 'https://steemit.com',
        body: 'test test test'
      },
      {
        author: 'a',
        reputation: 123,
        permlink: 'aaa',
        json_metadata: '',
        created: '2018-05-31T23:20:06.000Z',
        last_update: '2018-05-31T23:20:06.000Z',
        url: 'https://steemit.com',
        body: 'test test test'
      }
    ]

    let res = checkUnique(sampleData)

    expect(res.violated.length).toEqual(1)
    expect(res.violated[0]).toEqual('a')
  })
})

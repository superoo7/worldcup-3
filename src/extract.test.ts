import {} from 'jest'
import { findRes, eachCountryFilter, extractBody } from './extract'
import { readFile } from '.'

describe('extract string', () => {
  it('finds result for reverse string', () => {
    let res1 = findRes('| t', true)
    let res2 = findRes('| w', true)
    let res3 = findRes('| l', true)
    expect(res1).toEqual('t')
    expect(res2).toEqual('w')
    expect(res3).toEqual('l')
  })

  it('finds result for string', () => {
    let res1 = findRes('| t w')
    let res2 = findRes('| w l')
    let res3 = findRes('| l t')
    expect(res1).toEqual('t')
    expect(res2).toEqual('w')
    expect(res3).toEqual('l')
  })

  it('filters each country', () => {
    let res1 = eachCountryFilter('t | italy v australia | t', 'italy', 'australia')
    let res2 = eachCountryFilter('w | italy v australia | l', 'italy', 'australia')
    let res3 = eachCountryFilter('l | italy v australia | w', 'italy', 'australia')

    expect(res1.match).toEqual('t')
    expect(res2.match).toEqual('w')
    expect(res3.match).toEqual('l')
  })

  it('extract match condition', async () => {
    let file = await readFile() // get from sample.json
    let res1 = extractBody(file[1].body.toLowerCase())
    let res2 = extractBody(file[0].body.toLowerCase())
  })
})

import extractMain, { findRes, extractBody } from './extract'
import * as fs from 'fs'
import { postData } from './type'

describe('extract string', () => {
  it('check sample data will return correct result', async () => {
    const res: postData[] = JSON.parse(fs.readFileSync('./sample.json', 'utf-8'))
    const { violated, data } = await extractMain(res)
    expect(violated).toEqual([])
  })
})

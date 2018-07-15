// Type
type postData = {
  author: string
  author_reputation: number
  title: string
  permlink: string
  json_metadata: string
  created: string
  last_update: string
  link: string
  body: string
  match?: extractedData
  error?: string
  points?: number
}

type match = (number | 'w' | 't' | 'l')[]

type extractedData = match[]

const country = ['France vs Belgium', 'Croatia vs England']

export { postData, extractedData, match, country }

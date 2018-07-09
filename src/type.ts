// Type
type postData = {
  author: string
  reputation: number
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

const country = [
  'Uruguay vs France', // Uruguay vs France
  'Brazil vs Belgium', // Brazil vs Belgium
  'Sweden vs England', // Sweden vs England
  'Russia vs Croatia' //  Russia vs Croatia
]

export { postData, extractedData, match, country }

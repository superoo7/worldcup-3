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
  'France vs Argentina', // France vs Argentina
  'Uruguay vs Portugal', // Uruguay vs Portugal
  'Spain vs Russia', // Spain vs Russia
  'Croatia vs Denmark', // Croatia vs Denmark
  'Brazil vs Mexico', // Brazil vs Mexico
  'Belgium vs Japan', // Belgium vs Japan
  'Sweden vs Switzerland', // Sweden vs Switzerland
  'Colombia vs England' // Colombia vs England
]

export { postData, extractedData, match, country }

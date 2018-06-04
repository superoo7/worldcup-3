// Type
type postData = {
  author: string
  reputation: number
  permlink: string
  json_metadata: string
  created: string
  last_update: string
  url: string
  body: string
  match?: extractedData
}

type match = 'w' | 'l' | 't'

type extractedData = match[]

const country = [
  'Russia v Saudi Arabia',
  'Egypt v Uruguay',
  'Morocco v Iran',
  'Portugal v Spain',
  'France v Australia',
  'Argentina v Iceland',
  'Peru v Denmark',
  'Croatia v Nigeria',
  'Costa Rica v Serbia',
  'Germany v Mexico',
  'Brazil v Switzerland',
  'Sweden v South Korea',
  'Belgium v Panama',
  'Tunisia v England',
  'Poland v Senegal',
  'Colombia v Japan',
  'Russia v Egypt',
  'Portugal v Morocco',
  'Uruguay v Saudi Arabia',
  'Iran v Spain',
  'France v Peru',
  'Denmark v Australia',
  'Argentina v Croatia',
  'Brazil v Costa Rica',
  'Nigeria v Iceland',
  'Serbia v Switzerland',
  'Belgium v Tunisia',
  'Germany v Sweden',
  'South Korea v Mexico',
  'England v Panama',
  'Japan v Senegal',
  'Poland v Colombia',
  'Uruguay v Russia',
  'Saudi Arabia v Egypt',
  'Spain v Morocco',
  'Iran v Portugal',
  'Denmark v France',
  'Australia v Peru',
  'Nigeria v Argentina',
  'Iceland v Croatia',
  'South Korea v Germany',
  'Mexico v Sweden',
  'Serbia v Brazil',
  'Switzerland v Costa Rica',
  'Japan v Poland',
  'Senegal v Colombia',
  'England v Belgium',
  'Panama v Tunisia'
]

export { postData, extractedData, match, country }

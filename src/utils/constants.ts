const PAIRS_COLLECTION = 'pair'
const AVERAGE_COLLECTION = 'pair-average'
const BINANCE_API = 'https://api.binance.com/api/v3'
// Dont forget load this enviroment variables
const MONGO_DB = process.env.MONGO_DB
const MONGO_URI = process.env.MONGO_URI

export {
  AVERAGE_COLLECTION,
  BINANCE_API,
  MONGO_DB,
  MONGO_URI,
  PAIRS_COLLECTION
}
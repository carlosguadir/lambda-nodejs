import { executeApiRequest } from '../binance'
import { PairAverage } from '../datasource/interfaces'

/**
 * Validate if pair exist on Binance Exchange
 * @param symbol string name of currency pair
 */
const validateSymbol = async ( symbol: string ) => {
  try {
    await executeApiRequest( { symbol } )
    return true
  } catch ( error ) {
    return false
  }
}


/**
 * Calculate average from array of pair average
 * @param pairAverages
 */
const symbolAverage = ( pairAverages: Array< PairAverage > ) => {
  return pairAverages
    .map( ( { price }: PairAverage ) => price )
    .reduce( 
      ( average: number, nextprice: number ) => average + nextprice
    ) / pairAverages.length
}

export { symbolAverage, validateSymbol }
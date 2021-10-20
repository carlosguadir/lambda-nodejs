import { ScheduledHandler } from 'aws-lambda'

import { executeApiRequest } from '../binance'
import { Pair } from '../datasource/interfaces'
import { dataSourceHandler, pairsdata } from '../datasource/utils'
import { AVERAGE_COLLECTION } from '../utils/constants'

const cronHandler: ScheduledHandler = async () => {
  const pairs: Array< Pair > = await pairsdata()
  const { database, datasource } = await dataSourceHandler( AVERAGE_COLLECTION )
  await Promise.all(
    pairs.map( async ( { symbol }: Pair ) => {
      try {
        const data = await executeApiRequest(
          { symbol }, `avgPrice`
        ) as { mins: number, price: string }
        await datasource.insertOne( {
          symbol,
          mins: data.mins,
          price: parseFloat( data.price as string ),
          createdAt: new Date()
        } )
      } catch ( error ) { console.error( error.message ) }
    } )
  )
  await database.close()
}

export { cronHandler }
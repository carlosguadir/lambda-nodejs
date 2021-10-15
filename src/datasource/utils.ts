import { Collection } from 'mongodb'

import { MONGO_DB, MONGO_URI, PAIRS_COLLECTION } from '../utils/constants'
import { MongodbDataSource } from './index'
import { Pair } from './interfaces'

export const dataSourceHandler = async ( collection: string = PAIRS_COLLECTION ): Promise<{ datasource: Collection, database: MongodbDataSource }> => {
  const database = new MongodbDataSource( MONGO_URI, MONGO_DB )
  await database.initialize()
  return { datasource: database.dataSource( collection ), database }
}

export const pairsdata = async (): Promise< Array< Pair > > => {
  const { datasource, database } = await dataSourceHandler()
  const data = ( await datasource
    .find()
    .sort( { createdAt: 1 } )
    .toArray() )
    .map( ( { _id: id, symbol }: Pair ) => {
      return { id, symbol }
    } )
  await database.close()
  return data
}
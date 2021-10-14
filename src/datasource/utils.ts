import { Collection } from 'mongodb'

import { MONGO_DB, MONGO_URI, PAIRS_COLLECTION } from '../utils/constants'
import { MongodbDataSource } from './index'
import { Pair } from './interfaces'

export const dataSourceHandler = async ( collection: string = PAIRS_COLLECTION ): Promise<Collection> => {
  const database = new MongodbDataSource( MONGO_URI, MONGO_DB )
  await database.initialize()
  return database.dataSource( collection )
}

export const pairsdata = async (): Promise< Array< Pair > > => {
  const database = await dataSourceHandler()
  return ( await database
    .find()
    .sort( { createdAt: 1 } )
    .toArray() )
    .map( ( { _id: id, symbol }: Pair ) => {
      return { id, symbol }
    } )
}
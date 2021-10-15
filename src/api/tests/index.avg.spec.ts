import * as supertest from 'supertest'
import { Response } from 'supertest'

import { dataSourceHandler } from '../../datasource/utils'
import { AVERAGE_COLLECTION } from '../../utils/constants'
import { application } from '../index'

beforeAll( async () => {
  const { datasource, database } = await dataSourceHandler( AVERAGE_COLLECTION )
  await datasource.insertMany( [
    { symbol: 'ADAUSDT', mins: 5, price: 12 },
    { symbol: 'ADAUSDT', mins: 5, price: 14 },
  ] )
  await database.close()
} )

afterAll( async () => {
  const { database, datasource } = await dataSourceHandler( AVERAGE_COLLECTION )
  await datasource.drop()
  await database.close()
} )

describe( 'API Average Testing', () => {

  test( 'GET /average bad request body', async () => {
    const validation = (
      response: Response,
      message: string = 'Symbol and lecture are required params'
    ) => {
      expect( response.body ).toEqual(
        expect.objectContaining( {
          success: false,
          message
        } )
      )
    }
    await supertest( application )
      .get( '/average' )
      .query( { symbol: 'TRXUSDT' } )
      .expect( 400 )
      .then( validation )
    await supertest( application )
      .get( '/average' )
      .query( {} )
      .expect( 400 )
      .then( validation )
    await supertest( application )
      .get( '/average' )
      .query( { lectures: 4 } )
      .expect( 400 )
      .then( validation )
    await supertest( application )
      .get( '/average' )
      .query( { symbol: 'TRXUSDT', lectures: -5 } )
      .expect( 400 )
      .then( ( response: Response ) =>
        validation( response, `Lectures needs to be grater than 1` )
      )
  } )

  test( 'GET /average success', async () => {
    await supertest( application )
      .get( '/average' )
      .query( { symbol: 'ADAUSDT', lectures: 4 } )
      .expect( 200 )
      .then( ( response: Response ) => {
        expect( response.body ).toEqual(
          expect.objectContaining( {
            average: 13,
            numberOfLectures: 2
          } )
        )
      } )
  } )

} )
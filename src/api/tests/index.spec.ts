import * as supertest from 'supertest'

import { dataSourceHandler } from '../../datasource/utils'
import { application } from '../index'

beforeEach( async () => {
  const { datasource, database } = await dataSourceHandler()
  await datasource.insertMany( [
    { symbol: 'ADAUSDT' },
    { symbol: 'ETHUSDT' },
    { symbol: 'DOGEUSDT' }
  ] )
  await database.close()
} )

afterEach( async () => {
  const { database, datasource } = await dataSourceHandler()
  await datasource.drop()
  await database.close()
} )

describe( 'API Testing', () => {

  test( 'POST /pairs', async () => {
    await supertest( application )
      .post( '/pairs' )
      .send( { symbol: 'TRXUSDT' } )
      .expect( 201 )
      .then( ( value ) => {
        expect( value.body ).toEqual(
          expect.objectContaining( {
            success: true,
            message: 'Pair symbol added'
          } )
        )
      } )
  } )

  test( 'GET /pairs', async () => {
    await supertest( application )
      .get( '/pairs' )
      .expect( 200 )
      .then( ( value ) => {
        expect( Array.isArray( value.body ) ).toBeTruthy()
        expect( value.body.length ).toEqual( 3 )
        expect( value.body ).toEqual( expect.arrayContaining( [
          expect.objectContaining( { symbol: 'ADAUSDT' } ),
          expect.objectContaining( { symbol: 'ETHUSDT' } ),
          expect.objectContaining( { symbol: 'DOGEUSDT' } )
        ] ) )
      } )
  } )

} )
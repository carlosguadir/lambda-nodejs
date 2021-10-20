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
    const test = [
      {
        body: {
          success: false,
          message: 'Symbol string pair is required'
        },
        code: 400,
        data: {}
      },
      {
        body: {
          success: false,
          message: 'Symbol not valid'
        },
        code: 400,
        data: { symbol: 'asf' }
      },
      {
        body: {
          success: true,
          message: 'Pair symbol added'
        },
        code: 201,
        data: { symbol: 'TRXUSDT' }
      },
      {
        body: {
          success: false,
          message: 'Symbol already exist'
        },
        code: 400,
        data: { symbol: 'ADAUSDT' }
      }

    ]
    for ( const { data, body, code } of test ) {
      await supertest( application )
        .post( '/pairs' )
        .send( data )
        .expect( code )
        .then( ( value ) => {
          expect( value.body ).toEqual(
            expect.objectContaining( body )
          )
        } )
    }
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
import { Request, Response, Router } from 'express'

import { Pair, PairAverage } from '../datasource/interfaces'
import { dataSourceHandler, pairsdata } from '../datasource/utils'
import { AVERAGE_COLLECTION } from '../utils/constants'
import { symbolAverage, validateSymbol } from './utils'
const router = Router()

/**
 * @swagger
 * /pairs:
 *   get:
 *     description: Query all pairs saved on data base
 *     responses:
 *       200:
 *         description: Returns an array o pairs with id and symbol.
 */
router.get( '/pairs', async ( _: Request, response: Response ) => {
  const pairs: Pair[] = await pairsdata()
  response.contentType( 'application/json' )
  response.send( JSON.stringify( pairs ) )
} )

router.post( '/pairs', async ( { body }: Request, response: Response )  => {
  response.contentType( 'application/json' )
  const { symbol } = body
  const validate: boolean = await validateSymbol(  symbol )
  const { database, datasource } = await dataSourceHandler()
  const exist = await datasource.findOne( { symbol } )
  let message: string
  let responseBody: string
  if ( ! symbol || typeof symbol !== 'string' ) {
    message = 'Symbol string pair is required'
  } else if ( ! validate ) {
    message = 'Symbol not valid'
  } else if ( exist ) {
    message = 'Symbol already exist'
  }
  if ( message ) {
    response.statusCode = 400
    responseBody = JSON.stringify( { success: false, message } )
  } else {
    await datasource.insertOne( { symbol, createdAt: new Date() } )
    response.statusCode = 201
    responseBody = JSON.stringify( {
      success: true,
      message: 'Pair symbol added'
    } )
  }
  await database.close()
  response.send( responseBody )
} )

router.get( '/average', async ( { query }: Request, response: Response ) => {
  response.contentType( 'application/json' )
  let message: string
  const { symbol, lectures } = query
  if ( ! symbol || ! lectures ) {
    message = 'Symbol and lecture are required params'
  } else if ( parseInt( lectures as string ) < 2 ) {
    message = 'Lectures needs to be grater than 1'
  }
  if ( message ) {
    response.statusCode = 400
    response.send( JSON.stringify( { message, success: false } ) )
    return
  }
  const { database, datasource } = await dataSourceHandler( AVERAGE_COLLECTION )
  const pairAverages: Array< PairAverage > = await datasource
    .find( { symbol: ( symbol as string ).toUpperCase() } )
    .sort( { createdAt: 1 } )
    .limit( parseInt( lectures as string || `2`  ) )
    .toArray() as Array< PairAverage >
  await database.close()
  if ( pairAverages.length === 0 ) {
    message = `There no data for this pair`
  } else if ( pairAverages.length < 2 ) {
    message = `There is no enough data for this pair`
  }
  if ( message ) {
    response.send( JSON.stringify( { message, success: false } ) )
  } else {
    response.send( JSON.stringify( {
      average: symbolAverage( pairAverages ),
      numberOfLectures: pairAverages.length
    } ) )
  }
} )

export { router }
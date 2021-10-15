import { Request, Response, Router } from 'express'

import { PairAverage } from '../../datasource/interfaces'
import { dataSourceHandler } from '../../datasource/utils'
import { AVERAGE_COLLECTION } from '../../utils/constants'
import { symbolAverage } from '../utils'

export const average = ( router: Router ) => {
  /**
  * @swagger
  * /average:
  *   get:
  *     description: Query average from pair given a lectures quantity
  *     parameters:
  *       - in: query
  *         name: symbol
  *         required: true
  *         description: String value with the pair to query.
  *         example: ADAUSDT
  *         schema:
  *           type: string
  *       - in: query
  *         name: lectures
  *         required: true
  *         description: Quantity of lecture to calculate average.
  *         example: 13
  *         schema:
  *           type: number
  *     responses:
  *       200:
  *         description: Returns average.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 average:
  *                   type: number
  *                   description: The average.
  *                   example: 13
  *                 numberOfLectures:
  *                   type: number
  *                   description: Total of lectures proccesed.
  *                   example: 19
  */
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
}
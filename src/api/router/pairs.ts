import { Request, Response, Router } from 'express'

import { Pair } from '../../datasource/interfaces'
import { dataSourceHandler, pairsdata } from '../../datasource/utils'
import { validateSymbol } from '../utils'

export const getPairs = ( router: Router ) => {
  /**
  * @swagger
  * /pairs:
  *   get:
  *     description: Query all pairs saved on data base
  *     responses:
  *       200:
  *         description: Returns an array of pairs with id and symbol.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               example: [ { id: '12341234234', symbol: ETHUSDT } ]
  *               properties:
  *                 id:
  *                   type: string
  *                   description: Hash identifier for the pair on data base.
  *                   example: '1242329083458715491623'
  *                 symbol:
  *                   type: string
  *                   description: Name of pair.
  *                   example: ETHUSDT
  */
  router.get( '/pairs', async ( _: Request, response: Response ) => {
    const pairs: Pair[] = await pairsdata()
    response.contentType( 'application/json' )
    response.send( JSON.stringify( pairs ) )
  } )
}

export const postPair = ( router: Router ) => {
  /**
  * @swagger
  * /pairs:
  *   post:
  *     description: Save new pair on database
  *     parameters:
  *       - in: query
  *         name: symbol
  *         required: true
  *         description: String value with the new pair to save.
  *         example: ADAUSDT
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Returns confirmation that pair has been added.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   description: True is everything is ok.
  *                   example: true
  *                 message:
  *                   type: string
  *                   description: Short description for response.
  *                   example: Pair symbol added
  */
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
}
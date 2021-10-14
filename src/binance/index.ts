import axios from 'axios'

import { BINANCE_API } from '../utils/constants'

export const executeApiRequest = async (
  params: Record< string, string >,
  path: string = 'exchangeInfo'
): Promise<unknown> => {
  return ( await axios.get( `${BINANCE_API}/${path}`,  { params } ) ).data
}
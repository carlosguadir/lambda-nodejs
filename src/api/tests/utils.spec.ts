import { symbolAverage, validateSymbol } from '../utils'

describe( 'Utils methods on api', () => {
  test( 'Validate pair on Binance', async ( ) => {
    expect( await validateSymbol( 'ADAUSDT' ) ).toBeTruthy()
    expect( await validateSymbol( 'aDAUSDT' ) ).toBeFalsy()
    expect( await validateSymbol( 'fakepair' ) ).toBeFalsy()
  } )

  test( 'Calculate average from array', async ( ) => {
    expect( symbolAverage( [
      { price: 14, mins: 5 },
      { price: 10, mins: 5 }
    ] ) ).toEqual( 12 )
    expect( symbolAverage( [
      { price: 26, mins: 5 },
      { price: 28, mins: 5 },
      { price: 30, mins: 5 },
    ] ) ).toEqual( 28 )
  } )
} )
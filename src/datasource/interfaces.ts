export interface Pair {
  id?: string
  _id?: string
  createdAt?: Date
  symbol?: string
}

export interface PairAverage extends Pair {
  mins: number
  price: number
}
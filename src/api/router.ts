import { Router } from 'express'

import { average } from './router/average'
import { getPairs, postPair } from './router/pairs'
const router = Router()

average( router )
getPairs( router )
postPair( router )

export { router }
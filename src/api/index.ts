import * as express from 'express'
import { json } from 'express'

import { router } from './router'

const application = express()

application.use( json() )
application.use( router )

export { application }
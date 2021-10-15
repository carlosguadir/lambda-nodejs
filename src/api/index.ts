import * as express from 'express'
import { json } from 'express'
import * as serverless from 'serverless-http'

import { router } from './router'

const application = express()

application.use( json() )
application.use( router )

const handler = serverless( application )

export {
  application,
  handler
}
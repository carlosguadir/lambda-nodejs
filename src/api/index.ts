import express, { json } from 'express'
import serverless from 'serverless-http'

import { router } from './router'

const application = express()

application.use( json() )
application.use( router )

export const handler = serverless( application )
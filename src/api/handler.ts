import * as serverless from 'serverless-http'

import { application } from './'

export const main = serverless( application )

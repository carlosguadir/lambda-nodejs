import * as swaggerJsdoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

import { application } from './index'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jedi API',
      version: '0.1.0',
      description: 'Simple Node JS lambda with express',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Carlos Guadir',
        email: 'carlosazzamiess@gmail.com',
      },
    }
  },
  apis: [
    `${__dirname}/router/average.ts`,
    `${__dirname}/router/pairs.ts`
  ],
}

const specs = swaggerJsdoc( options )

const port: number = 3000
application.use( '/docs', serve, setup( specs ) )
application.listen( port, () => {
  // eslint-disable-next-line no-console
  console.info( `Server is alive http://localhost:${port}/docs` )
} )
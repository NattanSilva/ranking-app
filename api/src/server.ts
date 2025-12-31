import cors from '@elysiajs/cors'
import openapi from '@elysiajs/openapi'
import { Elysia, t } from 'elysia'
import { env } from './env'
import { betterAuthPluggin, OpenAPI } from './pluggins/better-auth'
import { createParticipantRoute } from './routes/participants/create'
import { deleteParticipantRoute } from './routes/participants/delete'
import { listParticipantsRoute } from './routes/participants/list'
import { retrieveParticipantRoute } from './routes/participants/retrieve'
import { updateParticipantRoute } from './routes/participants/update'
import { createPointRoute } from './routes/points/create'
import { deletePointRoute } from './routes/points/delete'
import { listPointsRoute } from './routes/points/list'
import { retrieveUserRoute } from './routes/user/retrieve'

const components = {
  ...(await OpenAPI.components),
  schemas: {
    ...(await OpenAPI.components).schemas,
  },
}

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:3000', ''],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(betterAuthPluggin)
  .use(
    openapi({
      documentation: {
        info: {
          title: 'Ranking API',
          version: '1.0.0',
        },
        components,
        paths: await OpenAPI.getPaths(),
      },
    })
  )
  .get(
    '/',
    ({ status }) => {
      return status(200, { message: 'Hello World' })
    },
    {
      detail: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Health check',
        operationId: 'healthCheck',
      },
      response: {
        200: t.Object({
          message: t.String({
            examples: ['Hello World'],
          }),
        }),
        500: t.Object({
          message: t.String({
            examples: ['Internal Server Error'],
          }),
        }),
      },
    }
  )
  .use(retrieveUserRoute)
  .use(createParticipantRoute)
  .use(listParticipantsRoute)
  .use(retrieveParticipantRoute)
  .use(updateParticipantRoute)
  .use(deleteParticipantRoute)
  .use(createPointRoute)
  .use(listPointsRoute)
  .use(deletePointRoute)
  .compile()
  .listen(env.PORT)

console.log(
  `🦊 Elysia is running at: http://${app.server?.hostname}:${app.server?.port}`
)
console.log(
  `🦊 API docs is running at: http://${app.server?.hostname}:${app.server?.port}/openapi`
)

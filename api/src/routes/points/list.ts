import { db } from '@/database/client'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const listPointsRoute = new Elysia().use(betterAuthPluggin).get(
  '/points',
  async ({ status }) => {
    const pointsList = await db.query.points.findMany()

    return status(200, pointsList)
  },
  {
    auth: true,
    detail: {
      tags: ['Points'],
      description: 'List all points',
      operationId: 'listPoints',
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    response: {
      200: t.Array(
        t.Object({
          id: t.String({
            format: 'uuid',
            examples: ['123e4567-e89b-12d3-a456-426614174000'],
          }),
          participantId: t.String({
            format: 'uuid',
            examples: ['123e4567-e89b-12d3-a456-426614174000'],
          }),
          attendance: t.Integer({
            examples: [10],
          }),
          punctuality: t.Integer({
            examples: [10],
          }),
          participation: t.Integer({
            examples: [10],
          }),
          visits: t.Integer({
            examples: [10],
          }),
          offer: t.Integer({
            examples: [10],
          }),
          teacher: t.Integer({
            examples: [10],
          }),
          schedule: t.Integer({
            examples: [10],
          }),
          total: t.Integer({
            examples: [80],
          }),
          createdAt: t.Date({
            examples: [new Date()],
          }),
        })
      ),
      401: t.Object({
        message: t.String({
          examples: ['Unauthorized.'],
        }),
      }),
      500: t.Object({
        message: t.String({
          examples: ['Internal server error.'],
        }),
      }),
    },
  }
)

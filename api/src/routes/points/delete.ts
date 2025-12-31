import { db } from '@/database/client'
import { points } from '@/database/schemas/points'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const deletePointRoute = new Elysia().use(betterAuthPluggin).delete(
  '/points/:pointId',
  async ({ status, params }) => {
    const { pointId } = params

    await db.delete(points).where(eq(points.id, pointId))

    return status(204, {})
  },
  {
    auth: true,
    detail: {
      tags: ['Points'],
      description: 'Delete a point',
      operationId: 'deletePoint',
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    params: t.Object({
      pointId: t.String({
        format: 'uuid',
        examples: ['123e4567-e89b-12d3-a456-4266141744450'],
      }),
    }),
    response: {
      204: t.Object({}),
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

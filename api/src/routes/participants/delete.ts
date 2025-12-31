import { db } from '@/database/client'
import { participants } from '@/database/schemas/participants'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const deleteParticipantRoute = new Elysia()
  .use(betterAuthPluggin)
  .delete(
    '/participants/:participantId',
    async ({ status, params }) => {
      const { participantId } = params

      await db.delete(participants).where(eq(participants.id, participantId))

      return status(204, {})
    },
    {
      auth: true,
      detail: {
        tags: ['Participants'],
        description: 'Delete a participant',
        operationId: 'deleteParticipant',
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      params: t.Object({
        participantId: t.String({
          format: 'uuid',
          examples: ['123e4567-e89b-12d3-a456-426614174000'],
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

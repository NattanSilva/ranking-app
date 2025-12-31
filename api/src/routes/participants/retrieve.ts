import { db } from '@/database/client'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const retrieveParticipantRoute = new Elysia().use(betterAuthPluggin).get(
  '/participants/:participantId',
  async ({ status, params }) => {
    const { participantId } = params

    const participant = await db.query.participants.findFirst({
      where({ id }) {
        return eq(id, participantId)
      },
    })

    if (!participant) {
      return status(404, { message: 'Participant not found.' })
    }

    return status(200, participant)
  },
  {
    auth: true,
    detail: {
      tags: ['Participants'],
      description: 'Retrieve a participant',
      operationId: 'retrieveParticipant',
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
      200: t.Object({
        id: t.String({
          format: 'uuid',
          examples: ['123e4567-e89b-12d3-a456-426614174000'],
        }),
        name: t.String({
          minLength: 3,
          examples: ['John Doe'],
        }),
        createdAt: t.Date({
          examples: [new Date()],
        }),
        updatedAt: t.Date({
          examples: [new Date()],
        }),
      }),
      401: t.Object({
        message: t.String({
          examples: ['Unauthorized.'],
        }),
      }),
      404: t.Object({
        message: t.String({
          examples: ['Participant not found.'],
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

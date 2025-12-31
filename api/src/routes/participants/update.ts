import { db } from '@/database/client'
import { participants } from '@/database/schemas/participants'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const updateParticipantRoute = new Elysia().use(betterAuthPluggin).patch(
  '/participants/:participantId',
  async ({ status, params, body }) => {
    const { participantId } = params

    const { name } = body

    const participant = await db.query.participants.findFirst({
      where({ id }) {
        return eq(id, participantId)
      },
    })

    if (!participant) {
      return status(404, { message: 'Participant not found.' })
    }

    const updatedParticipant = await db
      .update(participants)
      .set({ name })
      .where(eq(participants.id, participantId))
      .returning()

    return status(200, updatedParticipant[0])
  },
  {
    auth: true,
    detail: {
      tags: ['Participants'],
      description: 'Update a participant',
      operationId: 'updateParticipant',
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
    body: t.Object({
      name: t.Optional(
        t.String({ minLength: 3, examples: ['John Doe Updated'] })
      ),
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

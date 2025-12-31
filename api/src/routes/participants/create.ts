import { db } from '@/database/client'
import { participants } from '@/database/schemas/participants'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const createParticipantRoute = new Elysia().use(betterAuthPluggin).post(
  '/participants',
  async ({ body, status }) => {
    const { name } = body

    const existingParticipant = await db
      .select()
      .from(participants)
      .where(eq(participants.name, name))
      .limit(1)

    if (existingParticipant.length > 0) {
      return status(409, { message: 'Participant already exists.' })
    }

    const createdParticipant = await db
      .insert(participants)
      .values({
        name,
      })
      .returning()

    return status(201, createdParticipant[0])
  },
  {
    auth: true,
    detail: {
      tags: ['Participants'],
      description: 'Create a new participant',
      operationId: 'createParticipant',
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    body: t.Object({
      name: t.String({
        minLength: 3,
        examples: ['John Doe'],
      }),
    }),
    response: {
      201: t.Object({
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
      409: t.Object({
        message: t.String({
          examples: ['Participant name has registred.'],
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

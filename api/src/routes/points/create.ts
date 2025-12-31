import { db } from '@/database/client'
import { participants } from '@/database/schemas/participants'
import { points } from '@/database/schemas/points'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const createPointRoute = new Elysia().use(betterAuthPluggin).post(
  '/points',
  async ({ body, status }) => {
    const {
      participantId,
      attendance,
      punctuality,
      participation,
      visits,
      offer,
      teacher,
      schedule,
      kahoot,
    } = body

    const existingParticipant = await db
      .select()
      .from(participants)
      .where(eq(participants.id, participantId))
      .limit(1)

    if (existingParticipant.length <= 0) {
      return status(404, { message: 'Participant not found.' })
    }

    const totalPoints =
      attendance +
      punctuality +
      participation +
      visits +
      offer +
      teacher +
      schedule +
      kahoot

    const createdPoint = await db
      .insert(points)
      .values({
        participantId,
        attendance,
        punctuality,
        participation,
        visits,
        offer,
        teacher,
        schedule,
        kahoot,
        total: totalPoints,
      })
      .returning()

    return status(201, createdPoint[0])
  },
  {
    auth: true,
    detail: {
      tags: ['Points'],
      description: 'Create a new point',
      operationId: 'createPoint',
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    body: t.Object({
      participantId: t.String({
        format: 'uuid',
        examples: ['123e4567-e89b-12d3-a456-426614174000'],
      }),
      attendance: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      punctuality: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      participation: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      visits: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      offer: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      teacher: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      schedule: t.Integer({
        minimum: 0,
        examples: [10],
      }),
      kahoot: t.Integer({
        examples: [10],
      }),
    }),
    response: {
      201: t.Object({
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
        schedule: t.Integer({
          examples: [10],
        }),
        offer: t.Integer({
          examples: [10],
        }),
        teacher: t.Integer({
          examples: [10],
        }),
        kahoot: t.Integer({
          examples: [10],
        }),
        total: t.Integer({
          examples: [80],
        }),
        createdAt: t.Date({
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

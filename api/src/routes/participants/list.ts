import { db } from '@/database/client'
import { rankParticipants } from '@/utils/rankParticipants'
import { desc } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

type Point = {
  id: string
  quantity: number
  participantId: string
  createdAt: Date
}

export const listParticipantsRoute = new Elysia().use(betterAuthPluggin).get(
  '/participants',
  async ({ status }) => {
    const participantsList = await db.query.participants.findMany({
      with: {
        points: {
          orderBy: (fields) => desc(fields.createdAt),
        },
      },
    })

    const rankedParticipants = rankParticipants(participantsList)

    return status(200, rankedParticipants)
  },
  {
    auth: true,
    detail: {
      tags: ['Participants'],
      description: 'List all participants',
      operationId: 'listParticipants',
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
          points: t.Array(
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
            })
          ),
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

import Elysia, { t } from 'elysia'
import { betterAuthPluggin } from '../../pluggins/better-auth'

export const retrieveUserRoute = new Elysia().use(betterAuthPluggin).get(
  'auth/user/retrieve',
  async ({ status, user }) => {
    return status(200, user)
  },
  {
    auth: true,
    detail: {
      tags: ['Better Auth'],
      description: 'Retrieve a user',
      operationId: 'retrieveUser',
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
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
        email: t.String({
          format: 'email',
          examples: ['JohnDoe@example.com'],
        }),
        emailVerified: t.Boolean({
          examples: [true],
        }),
        image: t.Optional(
          t.Union([
            t.String({
              examples: ['https://example.com/image.jpg'],
            }),
            t.Null(),
          ])
        ),
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

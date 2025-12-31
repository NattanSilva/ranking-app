import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { participants } from './participants'

export const points = pgTable('points', {
  id: uuid('id').defaultRandom().primaryKey(),
  participantId: uuid('participant_id')
    .notNull()
    .references(() => participants.id, { onDelete: 'cascade' }),
  attendance: integer('attendance').notNull().default(0),
  punctuality: integer('punctuality').notNull().default(0),
  participation: integer('participation').notNull().default(0),
  visits: integer('visits').notNull().default(0),
  offer: integer('offer').notNull().default(0),
  teacher: integer('teacher').notNull().default(0),
  schedule: integer('schedule').notNull().default(0),
  kahoot: integer('kahoot').notNull().default(0),
  total: integer('total').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const pointsRelations = relations(points, ({ one }) => ({
  participant: one(participants, {
    fields: [points.participantId],
    references: [participants.id],
  }),
}))

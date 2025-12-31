import { accounts, accountsRelations } from './accounts'
import { participants, participantsRelations } from './participants'
import { points, pointsRelations } from './points'
import { sessions, sessionsRelations } from './sessions'
import { users, usersRelations } from './users'
import { verifications } from './verifications'

export const schema = {
  users,
  usersRelations,
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  verifications,
  participants,
  participantsRelations,
  points,
  pointsRelations,
}

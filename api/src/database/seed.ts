import { faker } from '@faker-js/faker'
import { db } from './client'
import { participants } from './schemas/participants'
import { points } from './schemas/points'

async function main() {
  const fiftheenArray = [0, 15]
  const fifthyArray = [0, 50]
  const tirthyArray = [0, 30]
  const fourthyArray = [0, 40]
  const eighthyArray = [0, 80]
  const kahootArray = [0, 40, 70, 100]

  console.log('Cleaning participants and points...')

  await db.delete(participants)
  console.log('Seeding database...')

  for (let i = 0; i < 5; i++) {
    const [participant] = await db
      .insert(participants)
      .values({
        name: faker.person.firstName(),
      })
      .returning()

    const attendance = fifthyArray[Math.floor(Math.random() * 2)]
    const punctuality = fifthyArray[Math.floor(Math.random() * 2)]
    const participation = tirthyArray[Math.floor(Math.random() * 2)]
    const visits = eighthyArray[Math.floor(Math.random() * 2)]
    const schedule = fourthyArray[Math.floor(Math.random() * 2)]
    const offer = fiftheenArray[Math.floor(Math.random() * 2)]
    const teacher = eighthyArray[Math.floor(Math.random() * 2)]
    const kahoot = kahootArray[Math.floor(Math.random() * 4)]

    const total =
      attendance +
      punctuality +
      participation +
      visits +
      schedule +
      offer +
      teacher +
      kahoot

    await db.insert(points).values({
      participantId: participant.id,
      attendance,
      punctuality,
      participation,
      visits,
      schedule,
      offer,
      teacher,
      kahoot,
      total,
    })
  }

  console.log('Database seeded.')
}

await main()

process.exit(0)

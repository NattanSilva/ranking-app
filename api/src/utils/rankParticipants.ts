type ParticipantList = {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  points: {
    id: string
    participantId: string
    attendance: number
    punctuality: number
    participation: number
    visits: number
    offer: number
    teacher: number
    schedule: number
    kahoot: number
    total: number
    createdAt: Date
  }[]
}[]

export function rankParticipants(dataList: ParticipantList): ParticipantList {
  const ordernedRank = dataList.sort((a, b) => {
    const totalA = a.points[0]?.total ?? 0
    const totalB = b.points[0]?.total ?? 0

    return totalB - totalA
  })

  return ordernedRank
}

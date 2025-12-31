import type { Point } from '@/components/Rank'
import { api } from '@/services/api'

type CreatePointProps = {
  participantId: string
  attendance: number
  punctuality: number
  participation: number
  visits: number
  offer: number
  teacher: number
  schedule: number
  kahoot: number
}

export function usePoints() {
  const registPoint = async ({
    participantId,
    attendance,
    punctuality,
    participation,
    visits,
    offer,
    teacher,
    schedule,
    kahoot,
  }: CreatePointProps) => {
    const response = await api.post<Point>('/points', {
      participantId,
      attendance,
      punctuality,
      participation,
      visits,
      offer,
      teacher,
      schedule,
      kahoot,
    })

    return response.data
  }

  return {
    registPoint,
  }
}

import type { Participant } from '@/components/Rank'
import { api } from '@/services/api'

export function useParticipant() {
  const registParticipant = async (name: string) => {
    const response = await api.post<Participant>('/participants', { name })

    return response.data
  }

  const deleteParticipant = async (id: string) => {
    await api.delete(`/participants/${id}`)
  }

  return {
    registParticipant,
    deleteParticipant,
  }
}

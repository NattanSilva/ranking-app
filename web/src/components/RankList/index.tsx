import type { Participant } from '../Rank'
import { RankCard } from '../RankCard'

type RankListProps = {
  participants: Participant[]
  searchTerm: string
}

export function RankList({ participants, searchTerm }: RankListProps) {
  let position = 1
  if (participants.length === 0) {
    return (
      <p className='text-center py-6 sm:py-8 text-neutral-400 text-sm sm:text-base px-4'>
        {searchTerm
          ? 'Nenhum participante encontrado com esse nome.'
          : 'Nenhum participante cadastrado ainda.'}
      </p>
    )
  }

  return (
    <ul className='flex flex-col gap-4 list-none p-0 m-0'>
      {participants.map((participant, index) => {
        if (
          index > 0 &&
          participant.points.length > 0 &&
          participant.points[0].total !==
            participants[index - 1].points[0].total
        ) {
          position++
        }

        return (
          <RankCard
            participant={participant}
            position={position}
            key={participant.id}
          />
        )
      })}
    </ul>
  )
}

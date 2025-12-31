import { cn } from '@/lib/utils'
import { Award, Pen } from 'lucide-react'
import { DeleteParticipantDialog } from '../DeleteParticipantDialog'
import type { Participant } from '../Rank'
import { Button } from '../ui/button'

interface RankCardProps extends React.HTMLAttributes<HTMLLIElement> {
  participant: Participant
  position: number
}

const pointFields = [
  { label: 'Assiduidade', key: 'attendance' },
  { label: 'Pontualidade', key: 'punctuality' },
  { label: 'Participação', key: 'participation' },
  { label: 'Visitas', key: 'visits' },
  { label: 'Programação', key: 'schedule' },
  { label: 'Oferta', key: 'offer' },
  { label: 'Passar lição', key: 'teacher' },
  { label: 'Kahoot', key: 'kahoot' },
] as const

export function RankCard({ participant, position, ...rest }: RankCardProps) {
  const currentPoints = participant.points[0]

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'border-yellow-500/50 bg-gradient-to-b from-yellow-600/20 to-neutral-800 shadow-yellow-500/20'
      case 2:
        return 'border-slate-400/50 bg-gradient-to-b from-slate-400/20 to-neutral-800 shadow-slate-400/20'
      case 3:
        return 'border-amber-600/50 bg-gradient-to-b from-amber-700/20 to-neutral-800 shadow-amber-600/20'
      default:
        return 'border-neutral-700/50 bg-neutral-800/50'
    }
  }

  const getPositionBadge = (position: number) => {
    if (position > 3) return null

    const styles = {
      1: 'bg-yellow-500',
      2: 'bg-slate-400',
      3: 'bg-amber-600',
    }

    return (
      <div
        className={cn(
          'absolute -top-2.5 left-3 text-neutral-900 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1',
          styles[position as 1 | 2 | 3]
        )}
      >
        <Award className='size-3' />
        <span>{position}º</span>
      </div>
    )
  }

  const getPositionTextColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-400'
      case 2:
        return 'text-slate-300'
      case 3:
        return 'text-amber-400'
      default:
        return 'text-neutral-300'
    }
  }

  return (
    <li
      className={cn(
        'relative rounded-xl border-2 shadow-lg transition-all hover:shadow-xl animate-slide-in-left',
        getPositionStyle(position)
      )}
      {...rest}
    >
      {getPositionBadge(position)}

      <div className='pt-5 pb-4 px-4 sm:px-6'>
        {/* Header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h3
              className={cn(
                'font-semibold text-base sm:text-lg truncate',
                getPositionTextColor(position)
              )}
            >
              {participant.name}
            </h3>
            <p className='text-neutral-400 text-xs'>{position}º lugar</p>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <Button
              size='icon'
              className='size-9 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-all cursor-pointer'
            >
              <Pen className='size-4' />
            </Button>

            <DeleteParticipantDialog
              participantId={participant.id}
              participantName={participant.name}
            />
          </div>
        </div>

        {/* TOTAL */}
        <div
          className={cn(
            'mt-3 flex items-center justify-between rounded-xl border px-4 py-3',
            position === 1 &&
              'border-yellow-500/60 bg-yellow-500/15 text-yellow-400',
            position === 2 &&
              'border-slate-400/60 bg-slate-400/15 text-slate-200',
            position === 3 &&
              'border-amber-600/60 bg-amber-600/15 text-amber-400',
            position > 3 &&
              'border-neutral-700 bg-neutral-900/70 text-neutral-100'
          )}
        >
          <div>
            <span className='text-xs uppercase tracking-wide text-neutral-400'>
              Total de pontos
            </span>
            <div className='text-2xl sm:text-3xl font-bold'>
              {currentPoints?.total ?? 0}
            </div>
          </div>

          <Award
            className={cn(
              'size-6 sm:size-7',
              position === 1 && 'text-yellow-400',
              position === 2 && 'text-slate-300',
              position === 3 && 'text-amber-400',
              position > 3 && 'text-neutral-500'
            )}
          />
        </div>

        {/* Grid */}
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
          {pointFields.map(({ label, key }) => (
            <div
              key={key}
              className='flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/60 py-2'
            >
              <span className='text-[10px] sm:text-xs text-neutral-400 text-center'>
                {label}
              </span>
              <span className='text-sm sm:text-base font-bold text-neutral-100'>
                {currentPoints?.[key] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}

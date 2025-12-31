'use client'

import primeiroLugar from '@/assets/1-lugar.png'
import segundoLugar from '@/assets/2-lugar.png'
import terceiroLugar from '@/assets/3-lugar.png'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import type { Participant } from '../Rank'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'

export function Podium() {
  const getParticipants = async () => {
    const response = await api.get<Participant[]>('/participants')

    return response.data
  }

  const { data: participants } = useQuery({
    queryKey: ['get-participants'],
    queryFn: getParticipants,
    enabled: false,
  })

  const podiumList: Participant[] = []

  participants?.forEach((participant, index) => {
    if (index === 0) {
      podiumList.push(participant)

      return
    }

    if (
      podiumList.length < 3 &&
      participant.points[0].total !== participants[index - 1].points[0].total
    ) {
      podiumList.push(participant)
    }
  })

  const positionDrawnValidation = (
    currentParticipant: Participant,
    participantsList: Participant[]
  ) => {
    const filteredList = participantsList.filter((participant) => {
      if (participant.points.length > 0) {
        return (
          participant.points[0].total === currentParticipant.points[0].total
        )
      }
    })

    return filteredList.length > 1 ? 'Empate' : currentParticipant.name
  }

  const firstPlaceName = participants
    ? positionDrawnValidation(podiumList[0], participants)
    : '---'
  const secondPlaceName = participants
    ? positionDrawnValidation(podiumList[1], participants)
    : '---'
  const thirdPlaceName = participants
    ? positionDrawnValidation(podiumList[2], participants)
    : '---'

  return (
    <Card className='w-full mt-24 pb-0 bg-neutral-900 border-neutral-800 md:flex-row'>
      <CardHeader className='md:flex-1'>
        <CardDescription className='text-neutral-400 text-xs md:text-lg'>
          Aqui estão os destaques que alcançaram as melhores posições com
          desempenho excepcional e resultados acima da média.
        </CardDescription>
      </CardHeader>
      <CardContent className=' md:w-[60%]'>
        <div className='flex items-end justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 w-full'>
          <div className='flex flex-col items-center gap-0 flex-1 max-w-22.5 sm:max-w-27.5 md:max-w-35 lg:max-w-45 animate-grow-up overflow-hidden'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'>
              <Image
                src={segundoLugar}
                alt='2º Lugar'
                fill
                className='object-contain'
              />
            </div>
            <div className='w-full bg-linear-to-b from-slate-400/20 to-neutral-800 rounded-t-lg px-1 py-2 sm:px-2 sm:py-3 md:px-3 md:py-4 lg:px-4 lg:py-5 border-t-2 border-x-2 border-slate-400/50 shadow-xl relative'>
              <div className='text-center'>
                <div className='text-slate-300 text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1'>
                  2º Lugar
                </div>
                <div className='text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold truncate'>
                  {secondPlaceName}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-0 flex-1 max-w-25 sm:max-w-30 md:max-w-40 lg:max-w-50 animate-grow-up overflow-hidden'>
            <div className='relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 order-first'>
              <Image
                src={primeiroLugar}
                alt='1º Lugar'
                fill
                className='object-contain drop-shadow-lg'
              />
            </div>
            <div className='w-full bg-linear-to-b from-yellow-600/20 to-neutral-800 rounded-t-lg px-1 py-3 sm:px-2 sm:py-4 md:px-3 md:py-6 lg:px-4 lg:py-8 border-t-2 border-x-2 border-yellow-500/50 shadow-xl relative'>
              <div className='absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-neutral-900 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full'>
                🏆
              </div>
              <div className='text-center mt-1 sm:mt-1.5 md:mt-2'>
                <div className='text-yellow-400 text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1'>
                  1º Lugar
                </div>
                <div className='text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold truncate'>
                  {firstPlaceName}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-0 flex-1 max-w-22.5 sm:max-w-27.5 md:max-w-35 lg:max-w-45 animate-grow-up overflow-hidden'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'>
              <Image
                src={terceiroLugar}
                alt='3º Lugar'
                fill
                className='object-contain'
              />
            </div>
            <div className='w-full bg-linear-to-b from-amber-700/20 to-neutral-800 rounded-t-lg px-1 py-2 sm:px-2 sm:py-2.5 md:px-3 md:py-4 lg:px-4 lg:py-5 border-t-2 border-x-2 border-amber-600/50 shadow-xl relative'>
              <div className='text-center'>
                <div className='text-amber-400 text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1'>
                  3º Lugar
                </div>
                <div className='text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold truncate'>
                  {thirdPlaceName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

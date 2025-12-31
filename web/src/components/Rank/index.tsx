'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { RefreshCw, Search } from 'lucide-react'
import { useState } from 'react'
import { RankList } from '../RankList'
import RegistParticipantDialog from '../RegistParticipantDialog'
import { Alert, AlertTitle } from '../ui/alert'

export type Point = {
  id: string
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
}

export type Participant = {
  id: string
  name: string
  points: Point[]
}

export function Rank() {
  const [searchTerm, setSearchTerm] = useState('')

  const getParticipants = async () => {
    const response = await api.get<Participant[]>('/participants')

    return response.data
  }

  const {
    data,
    error: getParticipantsError,
    isLoading,
  } = useQuery({
    queryKey: ['get-participants'],
    queryFn: getParticipants,
  })

  if (getParticipantsError) {
    return (
      <main className='w-full h-dvh flex flex-col items-center justify-center bg-neutral-950 px-[5%]'>
        <p>Erro ao carregar o rank</p>
      </main>
    )
  }

  return (
    <div className='w-full mt-4 mb-4 md:mt-8 md:mb-8'>
      <Card className='bg-neutral-900 border-neutral-800'>
        <CardHeader>
          <CardTitle className='text-white text-lg sm:text-xl md:text-2xl'>
            Ranking Geral
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='relative flex-1 w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400' />
              <Input
                type='text'
                placeholder='Pesquisar por nome...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-9 pr-3 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 text-sm sm:text-base'
              />
            </div>
            <RegistParticipantDialog />
          </div>

          {getParticipantsError ? (
            <Alert
              variant={'destructive'}
              className='flex flex-row items-center bg-neutral-900 border-red-500'
            >
              <AlertTitle>Erro ao carregar o rank, tente novamente.</AlertTitle>
              <Button className='border-none bg-transparent transition-colors hover:bg-transparent cursor-pointer hover:animate-spin'>
                <RefreshCw className='text-destructive' />
              </Button>
            </Alert>
          ) : (
            <RankList participants={data ?? []} searchTerm={searchTerm} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

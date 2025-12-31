'use client'

import { ErrorScreen } from '@/components/ErrorScreen'
import { Loading } from '@/components/Loading'
import { Podium } from '@/components/Podium'
import { Rank } from '@/components/Rank'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const getAPiStatus = async () => {
    const response = await api.get<{ message: string }>('/')

    return response.data
  }

  const { isLoading, error: apiStatusError } = useQuery({
    queryKey: ['get-api-status'],
    queryFn: getAPiStatus,
  })

  if (apiStatusError) {
    return <ErrorScreen />
  }

  if (isLoading) {
    return (
      <main className='w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-[5%]'>
        <Loading />
      </main>
    )
  }

  return (
    <main className='w-full min-h-dvh flex flex-col items-center bg-neutral-950 px-[5%]'>
      <Podium />
      <Rank />
    </main>
  )
}

'use client'

import { signOut } from '@/lib/auth'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  House,
  Menu,
  RefreshCw,
  Settings,
  TrendingUp,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loading } from '../Loading'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home', icon: House },
    { href: '/graficos', label: 'Gráficos', icon: TrendingUp },
    { href: '/configuracoes', label: 'Configurações', icon: Settings },
  ]
  const getUserData = async () => {
    const response = await api.get<{
      id: string
      name: string
      email: string
      emailVerified: false
      image: string | null | undefined
      createdAt: Date
      updatedAt: Date
    }>('/auth/user/retrieve')

    return response.data
  }
  const router = useRouter()

  const {
    data,
    error: getUserDataError,
    isLoading,
  } = useQuery({
    queryKey: ['get-user-data'],
    queryFn: getUserData,
    retry: true,
  })

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          toast('Volte sempre que precisar!')
          router.replace('/login')
        },
        onError: () => {
          toast.error('Erro ao deslogar.')
        },
      },
    })
  }

  if (isLoading) {
    return (
      <main className='w-full h-screen flex flex-col items-center justify-center bg-neutral-950 px-[5%]'>
        <Loading />
      </main>
    )
  }

  if (!isLoading && !getUserDataError && data) {
    toast(`Bem vindo de volta, ${data.name}!`)
  }

  return getUserDataError ? (
    <header className='w-full h-20 flex items-center justify-center px-[5%] fixed top-0 z-20 shadow-xl border-b border-neutral-800 bg-neutral-900 text-neutral-100'>
      <nav className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button className='border-none bg-transparent hover:bg-transparent cursor-pointer hover:animate-spin'>
            <RefreshCw className='text-destructive' />
          </Button>
          <h1 className='text-destructive'>
            Erro ao carregar os dados do usuario
          </h1>
        </div>
      </nav>
    </header>
  ) : (
    <header className='w-full h-20 flex items-center justify-center px-[5%] fixed top-0 z-20 shadow-xl border-b border-neutral-800 bg-neutral-900 text-neutral-100'>
      <nav className='w-full flex items-center justify-between'>
        {isLoading ? (
          <div className='flex items-center gap-1 animate-pulse'>
            <div className='h-10 w-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 flex items-center justify-center'>
              <User />
            </div>

            <span className='font-medium text-base sm:text-base'>
              Carregando...
            </span>
          </div>
        ) : (
          <div className='flex items-center gap-1'>
            <div className='h-10 w-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 flex items-center justify-center'>
              {data?.image && data.image !== '' ? (
                <Image
                  src={data.image}
                  alt={data.name}
                  width={40}
                  height={40}
                  className='object-cover'
                />
              ) : (
                <User />
              )}
            </div>

            <span className='font-medium text-base sm:text-base'>
              {data?.name}
            </span>
          </div>
        )}

        <div className='hidden md:flex items-center gap-6'>
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className='flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-neutral-800/50'
              >
                <Icon className='size-4' />
                <span className='text-sm font-medium'>{link.label}</span>
              </Link>
            )
          })}

          <button
            type='button'
            onClick={handleLogout}
            className='flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-neutral-800/50 cursor-pointer'
          >
            <ArrowLeft className='size-4' />
            <span className='text-sm font-medium'>Sair</span>
          </button>
        </div>

        <div className='block md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type='button'
                className='cursor-pointer p-2 rounded-md hover:bg-neutral-800/50 transition-colors'
                aria-label='Menu'
              >
                <Menu className='size-5' />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='end'
              className='bg-neutral-900 text-neutral-100 border-neutral-700 w-48'
            >
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-neutral-800' />

              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <DropdownMenuItem
                    key={link.href}
                    className='flex items-center cursor-pointer'
                    asChild
                  >
                    <Link href={link.href} className='flex items-center gap-2'>
                      <Icon className='size-4' />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}

              <DropdownMenuSeparator className='bg-neutral-800' />

              <DropdownMenuItem className='flex items-center cursor-pointer'>
                <ArrowLeft className='size-4' />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}

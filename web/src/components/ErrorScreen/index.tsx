import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export function ErrorScreen() {
  return (
    <main className='relative w-full h-screen flex flex-col items-center justify-center px-[5%] z-100 bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden'>
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-soft-light"
      />

      {/* Glow */}
      <div
        aria-hidden
        className='absolute -inset-32 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_60%)] blur-3xl'
      />

      <Alert
        variant='destructive'
        className='relative bg-neutral-900/90 border-red-500 animate-glitch md:w-[45%]'
      >
        <AlertTriangle />
        <AlertTitle>Ops algo deu errado!</AlertTitle>
        <AlertDescription>
          Estamos trabalhando para corrigir o problema...
        </AlertDescription>
      </Alert>
    </main>
  )
}

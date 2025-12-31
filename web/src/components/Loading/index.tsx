export function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-950'>
      <div className='flex flex-col items-center gap-6'>
        {/* Spinner moderno */}
        <div className='relative h-14 w-14'>
          <div className='absolute inset-0 rounded-full border-4 border-neutral-800' />
          <div className='absolute inset-0 animate-spin rounded-full border-4 border-t-neutral-300 border-neutral-800' />
        </div>

        {/* Texto */}
        <p className='text-sm tracking-wide text-neutral-400 animate-pulse'>
          Carregando...
        </p>
      </div>
    </div>
  )
}

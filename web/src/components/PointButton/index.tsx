'use client'

import { Path, UseFormSetValue } from 'react-hook-form'
import type { ParticipantFormData } from '../RegistParticipantDialog'

type PointButtonProps = {
  label: string
  name: Path<ParticipantFormData>
  point: string
  value: number
  setValue: UseFormSetValue<ParticipantFormData>
}

export function PointButton({
  label,
  point,
  value,
  name,
  setValue,
}: PointButtonProps) {
  const handleClick = () => {
    setValue(name, value + 1, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`relative w-full md:w-[30%] lg:w-[20%] h-10 md:h-11 flex items-center justify-between px-3 rounded-md border text-sm md:text-base transition-all ${
        value > 0
          ? 'border-blue-600 bg-blue-900/30 text-white'
          : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-blue-600 hover:bg-neutral-800'
      }`}
    >
      <span className='truncate'>{label}</span>

      <span className='text-green-500 font-semibold text-sm md:text-base'>
        +{point}
      </span>

      {value > 1 && (
        <span className='absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white'>
          {value}
        </span>
      )}
    </button>
  )
}

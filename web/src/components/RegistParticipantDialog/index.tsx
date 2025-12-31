'use client'

import { useParticipant } from '@/hooks/useParticipant'
import { usePoints } from '@/hooks/usePoints'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCheck, Plus, RotateCcw, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { PointButton } from '../PointButton'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const participantSchema = z.object({
  participant: z.object({
    name: z.string().min(3, { error: 'Nome deve ter pelo menos 3 caracteres' }),
  }),
  point: z.object({
    attendance: z.number().min(0),
    punctuality: z.number().min(0),
    participation: z.number().min(0),
    visits: z.number().min(0),
    offer: z.number().min(0),
    teacher: z.number().min(0),
    schedule: z.number().min(0),
    kahoot: z.object({
      first: z.number().min(0),
      second: z.number().min(0),
      third: z.number().min(0),
    }),
  }),
})

export type ParticipantFormData = z.infer<typeof participantSchema>

const defaultValues: ParticipantFormData = {
  participant: { name: '' },
  point: {
    attendance: 0,
    punctuality: 0,
    participation: 0,
    visits: 0,
    offer: 0,
    teacher: 0,
    schedule: 0,
    kahoot: { first: 0, second: 0, third: 0 },
  },
}

export default function RegistParticipantDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { registParticipant } = useParticipant()
  const { registPoint } = usePoints()
  const queryClient = useQueryClient()

  const {
    mutateAsync: registParticipantMutate,
    isPending: participantMutateIsPending,
  } = useMutation({
    mutationKey: ['regist-participant'],
    mutationFn: registParticipant,
  })

  const { mutateAsync: registPointMutate, isPending: pointMutateIsPending } =
    useMutation({
      mutationKey: ['regist-point'],
      mutationFn: registPoint,
    })

  const form = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
    defaultValues,
  })

  const handleRegistParticipant = async (data: ParticipantFormData) => {
    try {
      const createdParticipant = await registParticipantMutate(
        data.participant.name
      )

      await registPointMutate({
        participantId: createdParticipant.id,
        attendance: data.point.attendance * 50,
        punctuality: data.point.punctuality * 50,
        participation: data.point.participation * 30,
        visits: data.point.visits * 80,
        offer: data.point.offer * 15,
        teacher: data.point.teacher * 80,
        schedule: data.point.schedule * 40,
        kahoot:
          data.point.kahoot.first * 100 +
          data.point.kahoot.second * 70 +
          data.point.kahoot.third * 40,
      })

      toast.success('Participante registrado com sucesso!')
      form.reset()

      queryClient.invalidateQueries({
        queryKey: ['get-participants'],
      })

      setDialogOpen(false)
    } catch (error) {
      toast.error('Ocorreu um erro ao registrar o participante.')
      console.log({ error })
    }
  }

  const handleResetPoints = () => {
    form.reset({
      ...defaultValues,
      participant: { name: form.getValues('participant.name') },
    })
  }

  let total =
    form.watch('point.attendance') * 50 +
    form.watch('point.punctuality') * 50 +
    form.watch('point.participation') * 30 +
    form.watch('point.visits') * 80 +
    form.watch('point.offer') * 15 +
    form.watch('point.teacher') * 80 +
    form.watch('point.schedule') * 40 +
    form.watch('point.kahoot.first') * 100 +
    form.watch('point.kahoot.second') * 70 +
    form.watch('point.kahoot.third') * 40

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type='button'
          className='flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700'
        >
          <Plus className='size-4' />
          Novo Participante
        </Button>
      </DialogTrigger>

      <DialogContent className='md:max-w-[85%] lg:max-w-[70%] bg-neutral-900 text-white max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl sm:text-2xl font-semibold text-center'>
            Novo Participante
          </DialogTitle>
          <DialogDescription className='text-center text-neutral-400'>
            Adicione um novo participante à competição.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegistParticipant)}
            className='flex flex-col md:flex-row md:flex-wrap md:justify-between items-center md:items-start gap-4 mt-4'
          >
            <FormField
              control={form.control}
              name='participant.name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Digite o nome do participante'
                      className='h-10 bg-neutral-800 border-neutral-700 text-neutral-100'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PointButton
              label='Assiduidade'
              point={'50'}
              name='point.attendance'
              value={form.watch('point.attendance')}
              setValue={form.setValue}
            />
            <PointButton
              label='Pontualidade'
              point={'50'}
              name='point.punctuality'
              value={form.watch('point.punctuality')}
              setValue={form.setValue}
            />
            <PointButton
              label='Participação'
              point={'30'}
              name='point.participation'
              value={form.watch('point.participation')}
              setValue={form.setValue}
            />
            <PointButton
              label='Visitas'
              point={'80'}
              name='point.visits'
              value={form.watch('point.visits')}
              setValue={form.setValue}
            />
            <PointButton
              label='Oferta'
              point={'15'}
              name='point.offer'
              value={form.watch('point.offer')}
              setValue={form.setValue}
            />
            <PointButton
              label='Passar Lição'
              point={'80'}
              name='point.teacher'
              value={form.watch('point.teacher')}
              setValue={form.setValue}
            />
            <PointButton
              label='Programação'
              point={'40'}
              name='point.schedule'
              value={form.watch('point.schedule')}
              setValue={form.setValue}
            />
            <PointButton
              label='Kahoot - 1º lugar'
              point={'100'}
              name='point.kahoot.first'
              value={form.watch('point.kahoot.first')}
              setValue={form.setValue}
            />
            <PointButton
              label='Kahoot - 2º lugar'
              point={'70'}
              name='point.kahoot.second'
              value={form.watch('point.kahoot.second')}
              setValue={form.setValue}
            />
            <PointButton
              label='Kahoot - 3º lugar'
              point={'40'}
              name='point.kahoot.third'
              value={form.watch('point.kahoot.third')}
              setValue={form.setValue}
            />

            <div className='w-full md:w-[30%] lg:w-[46.5%] flex flex-col items-center rounded-lg border border-neutral-700 bg-neutral-800 px-4 md:px1 py-4 md:py-1'>
              <span className='text-xs text-neutral-400'>Total de Pontos</span>
              <div className='flex items-center gap-2 mt-1'>
                <span
                  className={`text-3xl font-bold ${
                    total > 0 ? 'text-green-500' : 'text-neutral-300'
                  }`}
                >
                  {total}
                </span>
                {total > 0 && <TrendingUp className='size-5 text-green-500' />}
              </div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-3 mt-2'>
              <Button
                type='button'
                disabled={
                  form.formState.isSubmitting ||
                  participantMutateIsPending ||
                  pointMutateIsPending
                }
                onClick={handleResetPoints}
                className='flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors'
              >
                <RotateCcw className='size-4' />
                Resetar Pontos
              </Button>

              <Button
                type='submit'
                disabled={
                  form.formState.isSubmitting ||
                  participantMutateIsPending ||
                  pointMutateIsPending
                }
                className='flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors disabled:opacity-50'
              >
                <CheckCheck className='size-4' />
                Registrar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

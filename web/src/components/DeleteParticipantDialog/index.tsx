'use client'

import { useParticipant } from '@/hooks/useParticipant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

type DeleteParticipantDialogProps = {
  participantId: string
  participantName: string
}

export function DeleteParticipantDialog({
  participantId,
  participantName,
}: DeleteParticipantDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { deleteParticipant } = useParticipant()
  const queryClient = useQueryClient()

  const { mutate: deleteParticipantMutate } = useMutation({
    mutationKey: ['delete-participant', participantId],
    mutationFn: deleteParticipant,
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o participante.')
    },
    onSuccess: () => {
      toast.success('Participante deletado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['get-participants'] })
      setDialogOpen(false)
    },
  })

  const handleDeleteParticipant = async () => {
    deleteParticipantMutate(participantId)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          type='button'
          className='size-9 rounded-full bg-neutral-800 border border-red-500/40 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer'
        >
          <Trash2 className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-neutral-900 text-white'>
        <DialogHeader>
          <DialogTitle>Tem certeza absoluta?</DialogTitle>
          <DialogDescription className='text-neutral-400'>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o(a)
            participante{' '}
            <strong className='font-medium text-neutral-300 italic'>
              {participantName}
            </strong>{' '}
            do ranking e removerá todos os seus dados de nossos servidores.
          </DialogDescription>
          <DialogFooter>
            <Button
              type='button'
              onClick={handleDeleteParticipant}
              className='flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors disabled:opacity-50'
            >
              Sim, excluir permanentemente
            </Button>
            <DialogClose asChild>
              <Button
                type='button'
                className='flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors disabled:opacity-50'
              >
                Não, cancelar exclusão
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleLogin(data: LoginFormData) {
    return await signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: 'http://localhost:3000/',
      },
      {
        onError: (context) => {
          if (context.error.message) {
            toast.error('E-mail ou senha inválidos.')
          }
        },
      }
    )
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-neutral-950 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-sm sm:max-w-md md:max-w-lg bg-neutral-900 text-neutral-100 shadow-xl border border-neutral-800'>
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl font-semibold text-center'>
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className='text-center text-neutral-400'>
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className='px-4 sm:px-6'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className='flex flex-col items-center space-y-4 sm:space-y-5'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='voce@exemplo.com'
                        className='h-10 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='w-full flex items-center justify-between'>
                      Senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        className='h-10 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full md:w-[50%] h-10 mt-2 bg-blue-800 hover:bg-blue-700'
                disabled={form.formState.isSubmitting}
              >
                <CheckCheck className='size-4' />
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

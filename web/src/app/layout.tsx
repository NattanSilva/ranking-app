import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/contexts/QueryProvider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ranking',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          theme='dark'
          closeButton
          position='bottom-right'
          toastOptions={{
            classNames: {
              toast: '!bg-neutral-800 !text-white !border-neutral-600',
              title: '!text-white',
              description: '!text-white',
              closeButton: 'hover:!bg-white hover:!text-black',
              cancelButton: '!text-white',
            },
          }}
        />
      </body>
    </html>
  )
}

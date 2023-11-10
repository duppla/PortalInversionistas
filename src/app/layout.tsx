import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '../app/context/authContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal inversionistas',
  description: 'Inversionistas duppla',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
        <AuthProvider>{/* envuelve toda la app */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

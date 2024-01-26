import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';

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
      <Link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

      <body
        className={inter.className}>
        <AuthProvider>{/* envuelve toda la app */}
          {children}

        </AuthProvider>

      </body>
    </html>
  )
}

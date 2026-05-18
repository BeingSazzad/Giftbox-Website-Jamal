import type { Metadata } from 'next'
import { AntdProvider } from '@/components/shared/AntdProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Gift Box',
  description: 'Win premium gadgets every single week',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className="font-sans">
        <AuthProvider>
          <AntdProvider>{children}</AntdProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HTN Front end challenge',
  description: 'Hack the North Front End Challenge.',
  other: {
    // 'google-site-verification': 'U-IOI6F8olpjNzy6kxQoFwrK82MUSXYaTZ3TQ_Y254c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative`}>{children}</body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Storefront',
  description:
    'Online store offering a wide range of products to support your journey.'
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html>
    <body
      className="overflow-x-hidden bg-background dark:bg-background-dark min-w-full w-fit [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2
                   [&::-webkit-scrollbar-track]:bg-secondary [&::-webkit-scrollbar-thumb]:bg-foreground
                   dark:[&::-webkit-scrollbar-track]:bg-secondary-dark dark:[&::-webkit-scrollbar-thumb]:bg-foreground-dark
                   [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {children}
    </body>
  </html>
)

export default RootLayout

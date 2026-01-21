/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from '../importMap'

// Payload CMS default styles
import '@payloadcms/ui/scss/app.scss'
import '../custom.scss'

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Signalton CMS',
  description: 'Content Management System for Signalton',
}

// Server action wrapper for handleServerFunctions
async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  return handleServerFunctions(args)
}

const Layout = ({ children }: Args) => (
  <RootLayout 
    config={config} 
    importMap={importMap} 
    serverFunction={serverFunction}
    htmlProps={{ suppressHydrationWarning: true }}
  >
    {children}
  </RootLayout>
)

export default Layout

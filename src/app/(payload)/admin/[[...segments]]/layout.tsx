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
// Based on Payload 3.x + Next.js 16 compatibility work (PR #14456)
// Config is passed via RootLayout, but we ensure it's available in server function
async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  
  // In Payload 3.x, handleServerFunctions should get config from RootLayout
  // But for Next.js 16 compatibility, we ensure config is available
  try {
    // Try standard call - config should come from RootLayout
    return handleServerFunctions(args)
  } catch (error) {
    // Fallback: import config dynamically if needed
    const payloadConfig = (await import('@payload-config')).default
    // Some Payload versions might need config as second parameter
    return handleServerFunctions(args, { config: payloadConfig } as any)
  }
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

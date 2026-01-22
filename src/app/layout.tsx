/**
 * Root Layout
 * 
 * Note: This layout does NOT render <html> or <body> tags.
 * Each route group ((main) and (payload)) provides its own HTML structure.
 * This prevents nested HTML/body hydration errors.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Just render children - let route groups handle their own HTML
  return <>{children}</>
}

import "@/app/globals.css"
import { Inter as FontSans } from "next/font/google"
import type { ReactNode } from "react"
import type { Metadata } from "next"

import { cn } from "@/lib/utils"
import NavigationBar from "@/components/composed/builder/nav/NavigationBar"

export const metadata: Metadata = {
  title: "Sloid",
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <section className="w-screen h-screen flex flex-col">
          <NavigationBar className="w-full h-12 border-b" />
          {children}
          <footer className="w-full h-6 border-t"></footer>
        </section>
      </body>
    </html>
  )
}

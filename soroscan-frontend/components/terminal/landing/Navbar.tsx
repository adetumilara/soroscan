"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "../Button"

export function Navbar() {
  return (
    <nav className="border-b border-terminal-green/30 px-8 py-4 flex justify-between items-center bg-terminal-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-terminal-green text-xl font-bold tracking-tighter hover:text-terminal-cyan transition-colors">
          [SOROSCAN_PROJECT]
        </Link>
      </div>
      <div className="hidden md:flex gap-8 text-xs text-terminal-gray uppercase tracking-widest">
        <Link href="/dashboard" className="hover:text-terminal-green transition-colors">Dashboard</Link>
        <Link href="/gallery" className="hover:text-terminal-green transition-colors">Gallery</Link>
        <a href="#" className="hover:text-terminal-green transition-colors">API_Docs</a>
        <a href="#" className="hover:text-terminal-green transition-colors">GitHub</a>
      </div>
      <Button size="sm" variant="secondary">CONNECT_WALLET</Button>
    </nav>
  )
}

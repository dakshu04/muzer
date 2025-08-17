"use client"

import { Music } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function Appbar() {
  const { data: session } = useSession()

  return (
    <header className="w-full ">
      <div className="max-w-7xl mx-auto flex items-center justify-between  py-4">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-7 w-7 text-purple-400" />
          <span className="text-xl font-bold text-purple-400">
            Muzi
          </span>
        </Link>

        {/* Middle - Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right - Auth Button */}
        <div>
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // This would be replaced with actual auth logic
  const mockLogin = () => setIsLoggedIn(true)
  const mockLogout = () => setIsLoggedIn(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span>AuctionHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/auctions"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/auctions" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Auctions
          </Link>
          {isLoggedIn && (
            <Link
              href="/profile"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/profile" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Profile
            </Link>
          )}
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <ModeToggle />
          {isLoggedIn ? (
            <>
              <Link href="/checkout">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Checkout</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={mockLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" onClick={mockLogin}>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}


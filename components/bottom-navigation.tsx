"use client"

import { Home, Search, Ticket, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      active: pathname === "/search",
    },
    {
      label: "Tickets",
      href: "/profile",
      icon: Ticket,
      active: pathname === "/profile" || pathname.startsWith("/profile/"),
      highlight: true,
    },
    {
      label: "Settings",
      href: "/profile/settings",
      icon: User,
      active: pathname.startsWith("/profile/settings"),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-black/80 backdrop-blur-md">
      <nav className="container flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              item.active ? "text-white" : "text-gray-500",
              item.highlight && item.active && "text-pink-500",
            )}
          >
            <item.icon className={cn("h-5 w-5", item.highlight && item.active && "text-pink-500")} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

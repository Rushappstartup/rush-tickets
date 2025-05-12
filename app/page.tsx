"use client"

import { CalendarDays, Clock, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Home() {
  // Simulated event data
  const todayEvents = [
    {
      id: 1,
      title: "Techno Night at Club Space",
      location: "Club Space, Miami",
      time: "11:00 PM",
      date: "Today",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 70.00",
    },
    {
      id: 2,
      title: "VIP Night at Mynt Lounge",
      location: "Mynt Lounge, Collins Ave",
      time: "10:30 PM",
      date: "Today",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 50.00",
    },
    {
      id: 3,
      title: "DJ Snake at LIV Nightclub",
      location: "LIV Nightclub, Miami Beach",
      time: "11:30 PM",
      date: "Today",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 90.00",
    },
  ]

  const upcomingEvents = [
    {
      id: 4,
      title: "Hip Hop Saturdays at LIV",
      location: "LIV Nightclub, Miami Beach",
      time: "10:00 PM",
      date: "Tomorrow",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 80.00",
    },
    {
      id: 5,
      title: "E11EVEN After Hours",
      location: "E11EVEN Miami, Downtown",
      time: "1:00 AM",
      date: "Fri, May 14",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 60.00",
    },
    {
      id: 6,
      title: "Ultra Music Festival Afterparty",
      location: "Story Nightclub, Miami Beach",
      time: "11:00 PM",
      date: "Sat, May 15",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 120.00",
    },
    {
      id: 7,
      title: "Latin Night at Ball & Chain",
      location: "Ball & Chain, Little Havana",
      time: "9:00 PM",
      date: "Sat, May 15",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 40.00",
    },
    {
      id: 8,
      title: "Poolside Party at Hyde Beach",
      location: "Hyde Beach, SLS South Beach",
      time: "2:00 PM",
      date: "Sun, May 16",
      image: "/placeholder.svg?height=200&width=400",
      price: "$ 65.00",
    },
  ]

  return (
    <div className="container px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          RUSH<span className="text-pink-500">Tickets</span>
        </h1>
        <Link href="/profile">
          <Button variant="outline" size="sm" className="border-pink-500 text-pink-500 hover:bg-pink-950">
            My Tickets
          </Button>
        </Link>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search events, venues or DJs"
          className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
          onFocus={(e) => (window.location.href = "/search")}
        />
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tonight</h2>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-pink-500" />
            <span className="text-sm text-gray-400">May 12</span>
          </div>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {todayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ScrollArea>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Coming Up</h2>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg hover:border-pink-900 transition-colors">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 gap-2">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <span className="text-pink-500 font-medium">{event.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

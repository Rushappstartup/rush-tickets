"use client"

import { SearchIcon, Filter, MapPin, CalendarRange } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Simulated event data
  const events = [
    {
      id: 1,
      title: "Techno Night at Club Space",
      location: "Club Space, Miami",
      date: "May 12, 2025",
      price: "$ 70.00",
      category: "Music",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "VIP Night at Mynt Lounge",
      location: "Mynt Lounge, Collins Ave",
      date: "May 12, 2025",
      price: "$ 50.00",
      category: "Music",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Hip Hop Saturdays at LIV",
      location: "LIV Nightclub, Miami Beach",
      date: "May 13, 2025",
      price: "$ 80.00",
      category: "Music",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "E11EVEN After Hours",
      location: "E11EVEN Miami, Downtown",
      date: "May 14, 2025",
      price: "$ 60.00",
      category: "Party",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      title: "Latin Night at Ball & Chain",
      location: "Ball & Chain, Little Havana",
      date: "May 15, 2025",
      price: "$ 40.00",
      category: "Music",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      title: "Pool Party at Hyde Beach",
      location: "SLS South Beach, Miami Beach",
      date: "May 16, 2025",
      price: "$ 45.00",
      category: "Pool Party",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      title: "Underground Beats at Treehouse",
      location: "Treehouse Miami, Miami Beach",
      date: "May 17, 2025",
      price: "$ 35.00",
      category: "Music",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Popular categories
  const popularCategories = ["Techno", "Hip-Hop", "Latin", "Pool Party", "VIP", "After Hours"]

  // Filter events based on search query
  const filteredEvents =
    searchQuery.trim() === ""
      ? events
      : events.filter(
          (event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Find Events</h1>
      </header>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Events, venues or artists"
          className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {searchQuery.trim() === "" && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-400 mb-3">Popular categories</h2>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="rounded-full border-gray-800 hover:border-pink-500 hover:text-pink-500"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="weekend">Weekend</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-pink-900 transition-colors">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{event.title}</h3>
                      <span className="text-pink-500 font-medium ml-2">{event.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <CalendarRange className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">{event.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <SearchIcon className="h-10 w-10 text-gray-500 mb-2" />
              <h3 className="text-lg font-medium mb-1">No results found</h3>
              <p className="text-sm text-gray-400 mb-4">Try different keywords or browse by category</p>
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="this-week" className="space-y-4">
          {filteredEvents
            .filter(
              (event) =>
                event.date.includes("May 12") ||
                event.date.includes("May 13") ||
                event.date.includes("May 14") ||
                event.date.includes("May 15") ||
                event.date.includes("May 16") ||
                event.date.includes("May 17") ||
                event.date.includes("May 18"),
            )
            .map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-pink-900 transition-colors">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{event.title}</h3>
                      <span className="text-pink-500 font-medium ml-2">{event.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <CalendarRange className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">{event.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </TabsContent>

        <TabsContent value="weekend" className="space-y-4">
          {filteredEvents
            .filter(
              (event) =>
                event.date.includes("May 15") || event.date.includes("May 16") || event.date.includes("May 17"),
            )
            .map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="flex gap-3 p-3 border border-gray-800 rounded-lg hover:border-pink-900 transition-colors">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{event.title}</h3>
                      <span className="text-pink-500 font-medium ml-2">{event.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-400">
                        <CalendarRange className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">{event.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

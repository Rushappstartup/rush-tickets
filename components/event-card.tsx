import { MapPin } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: number
    title: string
    location: string
    time: string
    date: string
    image: string
    price: string
  }
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex-shrink-0 w-64 rounded-lg overflow-hidden border border-gray-800 hover:border-pink-900 transition-colors"
    >
      <div className="relative h-32">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <span className="text-xs font-medium bg-pink-600 text-white px-2 py-0.5 rounded-full">{event.time}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-pink-500 font-medium">{event.price}</span>
        </div>
      </div>
    </Link>
  )
}

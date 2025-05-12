import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SellTicketPage() {
  // Simulated ticket data to be sold
  const ticket = {
    id: "123456",
    eventName: "Techno Night at Club Space",
    date: "May 12, 2025",
    time: "11:00 PM - 12:00 PM",
    location: "Club Space, Miami",
    originalPrice: "$ 70.00",
  }

  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Sell Ticket</h1>
      </header>

      <div className="border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="font-medium mb-2">{ticket.eventName}</h2>
        <div className="text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="h-3 w-3" />
            <span>#{ticket.id}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-3 w-3" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-3 w-3" />
            <span>{ticket.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>{ticket.location}</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Original price:</span>
          <span className="text-pink-500 font-medium">{ticket.originalPrice}</span>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="price">Selling price</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="price"
              type="text"
              placeholder="0.00"
              className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
            />
          </div>
          <p className="text-xs text-gray-400">Service fee: 10% (included in the price you set)</p>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-pink-600 hover:bg-pink-700">List for sale</Button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Your ticket will be visible to buyers immediately after listing.
          </p>
        </div>
      </form>
    </div>
  )
}

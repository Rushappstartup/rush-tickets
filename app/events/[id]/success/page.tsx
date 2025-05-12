import { ArrowLeft, Calendar, Check, Clock, Download, MapPin, Share2, Ticket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function SuccessPage({ params }: { params: { id: string } }) {
  // Update the event data to a Miami event
  const event = {
    id: params.id,
    title: "Techno Night at Club Space",
    date: "May 12, 2025",
    time: "11:00 PM",
    location: "Club Space, Miami",
    ticketId: "123456789",
    qrCode: "/placeholder.svg?height=200&width=200",
  }

  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Ticket Confirmed</h1>
      </header>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="h-16 w-16 rounded-full bg-green-900 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-xl font-bold mb-1">Purchase Successful!</h2>
        <p className="text-sm text-gray-400 text-center">Your ticket has been added to your wallet</p>
      </div>

      <div className="border border-gray-800 rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <h3 className="font-medium mb-2">{event.title}</h3>
          <div className="text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center gap-2 text-sm">
            <Ticket className="h-3 w-3 text-pink-500" />
            <span>Ticket ID: #{event.ticketId}</span>
          </div>
        </div>

        <div className="bg-gray-950 p-6 flex flex-col items-center">
          <img src={event.qrCode || "/placeholder.svg"} alt="QR Code" className="mb-2" />
          <p className="text-xs text-gray-400">Present this QR code at the venue entrance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" className="flex gap-2">
          <Download className="h-4 w-4" />
          <span>Save</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      <div className="space-y-3">
        <Link href="/profile">
          <Button className="w-full bg-pink-600 hover:bg-pink-700">View My Tickets</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Find More Events
          </Button>
        </Link>
      </div>
    </div>
  )
}

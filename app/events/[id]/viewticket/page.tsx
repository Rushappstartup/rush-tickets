import { ArrowLeft, Calendar, Clock, Download, MapPin, Share2, Ticket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ViewTicketPage({ params }: { params: { id: string } }) {
  // Simulated ticket data
  const ticket = {
    id: params.id,
    eventName: "Techno Night at Club Space",
    date: "May 12, 2025",
    time: "11:00 PM",
    location: "Club Space, Miami",
    address: "34 NE 11th St, Miami, FL 33132",
    ticketId: "123456",
    ticketType: "General Admission",
    price: "$ 70.00",
    qrCode: "/placeholder.svg?height=200&width=200",
  }

  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Ticket Details</h1>
      </header>

      <div className="border border-gray-800 rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <h3 className="font-medium mb-2">{ticket.eventName}</h3>
          <div className="text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3 w-3" />
              <span>{ticket.date}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3 w-3" />
              <span>{ticket.time}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3" />
              <span>{ticket.location}</span>
            </div>
            <p className="pl-5 text-xs">{ticket.address}</p>
          </div>
          <Separator className="my-3" />
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <Ticket className="h-3 w-3 text-pink-500" />
              <span>Ticket ID: #{ticket.ticketId}</span>
            </div>
            <p className="pl-5 text-xs">Type: {ticket.ticketType}</p>
            <p className="pl-5 text-xs">Price: {ticket.price}</p>
          </div>
        </div>

        <div className="bg-gray-950 p-6 flex flex-col items-center">
          <img src={ticket.qrCode || "/placeholder.svg"} alt="QR Code" className="mb-2" />
          <p className="text-xs text-gray-400">Present this QR code at the venue entrance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" className="flex gap-2">
          <Download className="h-4 w-4" />
          <span>Save to Phone</span>
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      <div className="space-y-3">
        <Link href={`/sell?ticketId=${ticket.id}`}>
          <Button className="w-full bg-pink-600 hover:bg-pink-700">Sell This Ticket</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

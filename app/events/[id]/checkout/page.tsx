import { ArrowLeft, Calendar, Clock, CreditCard, Info, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  // Update the event data to a Miami event
  const event = {
    id: params.id,
    title: "Techno Night at Club Space",
    date: "May 12, 2025",
    time: "11:00 PM",
    location: "Club Space, Miami",
    price: "$ 70.00",
    serviceFee: "$ 7.00",
    total: "$ 77.00",
  }

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="flex items-center gap-4 mb-6">
        <Link href={`/events/${params.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Checkout</h1>
      </header>

      <div className="border border-gray-800 rounded-lg p-4 mb-6">
        <h2 className="font-medium mb-2">{event.title}</h2>
        <div className="text-sm text-gray-400">
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
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Tickets</h2>
          <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-pink-500" />
              <span>General Admission</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-800 rounded-md">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                  -
                </Button>
                <div className="flex items-center justify-center w-8 h-8">1</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                  +
                </Button>
              </div>
              <span className="text-pink-500 font-medium w-20 text-right">{event.price}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <RadioGroup defaultValue="card" className="space-y-3">
            <div className="flex items-center space-x-2 border border-gray-800 rounded-lg p-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-5 w-5" />
                <span>Credit Card</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-gray-800 rounded-lg p-3">
              <RadioGroupItem value="apple" id="apple" />
              <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.2 6L12 10.2L7.8 6L6 7.8L10.2 12L6 16.2L7.8 18L12 13.8L16.2 18L18 16.2L13.8 12L18 7.8L16.2 6Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Apple Pay</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Card Details</h3>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="0000 0000 0000 0000"
              className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500" />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Ticket Price</span>
              <span>{event.price}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Service fee</span>
                <button className="text-gray-400">
                  <Info className="h-3 w-3" />
                </button>
              </div>
              <span>{event.serviceFee}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-pink-500">{event.total}</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link href={`/events/${params.id}/success`}>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">Complete Purchase</Button>
          </Link>
          <p className="text-xs text-gray-400 text-center mt-2">
            By completing this purchase, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}

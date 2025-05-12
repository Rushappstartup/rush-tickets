import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Ticket {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
  status: 'available' | 'sold_out' | 'cancelled';
  saleStartDate: string;
  saleEndDate: string;
  description?: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  image: string;
  category: string;
}

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const [eventResponse, ticketsResponse] = await Promise.all([
          api.getEvent(params.id),
          api.getEventTickets(params.id)
        ]);

        if (eventResponse.error) throw new Error(eventResponse.error);
        if (ticketsResponse.error) throw new Error(ticketsResponse.error);

        setEvent(eventResponse.data);
        setTickets(ticketsResponse.data);
      } catch (error) {
        toast.error('Failed to load event details');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventAndTickets();
  }, [params.id, router]);

  const handlePurchase = async (ticketId: string) => {
    setPurchaseLoading(ticketId);
    try {
      const response = await api.purchaseTicket(ticketId, 1);
      
      if (response.error) {
        throw new Error(response.error);
      }

      toast.success('Ticket purchased successfully!');
      router.push('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to purchase ticket');
    } finally {
      setPurchaseLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-800 rounded"></div>
          <div className="h-64 bg-gray-800 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{event.title}</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>

            <p className="text-gray-300">{event.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Available Tickets</h2>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border border-gray-800 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{ticket.name}</h3>
                    <p className="text-sm text-gray-400">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${ticket.price}</p>
                    <p className="text-sm text-gray-400">
                      {ticket.quantity - ticket.sold} remaining
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={ticket.status !== 'available' || purchaseLoading === ticket._id}
                  onClick={() => handlePurchase(ticket._id)}
                >
                  {purchaseLoading === ticket._id
                    ? 'Processing...'
                    : ticket.status === 'available'
                    ? 'Purchase Ticket'
                    : ticket.status === 'sold_out'
                    ? 'Sold Out'
                    : 'Cancelled'}
                </Button>
              </div>
            ))}

            {tickets.length === 0 && (
              <p className="text-gray-400 text-center py-4">
                No tickets available for this event
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

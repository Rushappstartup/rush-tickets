import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import Link from "next/link"

interface PurchasedTicket {
  _id: string;
  name: string;
  price: number;
  purchaseDate: string;
  event: {
    _id: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<PurchasedTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.getUserTickets();
        
        if (response.error) {
          throw new Error(response.error);
        }

        setTickets(response.data);
      } catch (error) {
        toast.error('Failed to load your tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (isLoading) {
    return (
      <div className="container px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-800 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">My Tickets</h1>
        <p className="text-gray-400">View and manage your purchased tickets</p>
      </header>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border border-gray-800 rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {ticket.event.image && (
                <div className="relative h-48 md:h-full">
                  <img
                    src={ticket.event.image}
                    alt={ticket.event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 md:p-6 md:col-span-2 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {ticket.event.title}
                  </h2>
                  <p className="text-gray-400">{ticket.name}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(ticket.event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{ticket.event.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{ticket.event.venue}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Ticket className="h-4 w-4" />
                    <span>Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-lg font-semibold">${ticket.price}</p>
                  <Link href={`/events/${ticket.event._id}`}>
                    <Button variant="outline">View Event</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You haven't purchased any tickets yet</p>
            <Link href="/">
              <Button>Browse Events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

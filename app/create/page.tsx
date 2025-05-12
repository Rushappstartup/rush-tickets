import { ArrowLeft, Calendar, Clock, ImageIcon, MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CreateEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const eventData = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        venue: formData.get('venue'),
        address: formData.get('address'),
        category: formData.get('category'),
        tickets: [{
          name: formData.get('ticket-name'),
          price: Number(formData.get('ticket-price')),
          quantity: Number(formData.get('ticket-quantity')),
          saleStartDate: new Date().toISOString(),
          saleEndDate: new Date(formData.get('date') as string).toISOString()
        }]
      };

      // Upload image first
      if (imageFile) {
        const uploadResponse = await api.uploadImage(imageFile);
        eventData.image = uploadResponse.file.path;
      }

      // Create event
      const response = await api.createEvent(eventData);
      
      if (response.error) {
        throw new Error(response.error);
      }

      toast.success('Event created successfully!');
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Create Event</h1>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="image">Event image</Label>
          <div
            className="border border-dashed border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center h-40"
            role="button"
            aria-label="Upload event image"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-400 text-center">Drag an image or click to upload</p>
              </>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button variant="outline" size="sm" className="mt-2" type="button">
              Select image
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Event name</Label>
          <Input
            id="title"
            placeholder="Ex: Techno Night at Club Space"
            className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
            required
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your event..."
            className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500 min-h-32"
            required
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="date"
                type="date"
                className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="time"
                type="time"
                className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
                required
                aria-required="true"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Venue</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Venue name"
              className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
              required
              aria-required="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Full address"
            className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
            required
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger className="bg-gray-950 border-gray-800 focus:ring-pink-500">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="theater">Theater</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Tickets</h2>

          <div className="border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Standard Ticket</h3>
              <Button variant="ghost" size="sm" className="h-8 text-gray-400" aria-label="Remove ticket">
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-name">Name</Label>
                <Input
                  id="ticket-name"
                  defaultValue="Standard Ticket"
                  className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
                  required
                  aria-required="true"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-price">Price ($)</Label>
                  <Input
                    id="ticket-price"
                    type="number"
                    placeholder="$0.00"
                    className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticket-quantity">Quantity</Label>
                  <Input
                    id="ticket-quantity"
                    type="number"
                    placeholder="100"
                    className="bg-gray-950 border-gray-800 focus-visible:ring-pink-500"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full" aria-label="Add another ticket type">
            <Plus className="h-4 w-4 mr-2" />
            Add another ticket type
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            className="w-full bg-pink-600 hover:bg-pink-700" 
            type="submit" 
            disabled={isLoading}
            aria-label="Publish event"
          >
            {isLoading ? 'Creating...' : 'Publish event'}
          </Button>
        </div>
      </form>
    </div>
  );
}

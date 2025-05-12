import { ArrowLeft, Plus, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FriendsPage() {
  // Simulated friends data
  const friends = [
    {
      id: 1,
      name: "John Smith",
      username: "@johnsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 5,
    },
    {
      id: 2,
      name: "Ana Oliveira",
      username: "@anaoliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 3,
    },
    {
      id: 3,
      name: "Carlos Santos",
      username: "@carlossantos",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 2,
    },
  ]

  // Simulated requests data
  const requests = [
    {
      id: 4,
      name: "Fernanda Lima",
      username: "@fernandalima",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 1,
    },
    {
      id: 5,
      name: "Ricardo Gomes",
      username: "@ricardogomes",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 4,
    },
  ]

  // Simulated suggestions data
  const suggestions = [
    {
      id: 6,
      name: "Mariana Costa",
      username: "@marianacosta",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 7,
    },
    {
      id: 7,
      name: "Pedro Alves",
      username: "@pedroalves",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 2,
    },
    {
      id: 8,
      name: "Juliana Martins",
      username: "@julianamartins",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 3,
    },
  ]

  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Friends</h1>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search friends" className="pl-10 bg-gray-950 border-gray-800 focus-visible:ring-pink-500" />
      </div>

      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                  <img
                    src={friend.avatar || "/placeholder.svg"}
                    alt={friend.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-sm text-gray-400">{friend.username}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View profile
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                    <img
                      src={request.avatar || "/placeholder.svg"}
                      alt={request.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-400">{request.mutualFriends} mutual friends</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Decline
                  </Button>
                  <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                    Accept
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <UserPlus className="h-10 w-10 text-gray-500 mb-2" />
              <h3 className="text-lg font-medium mb-1">No requests</h3>
              <p className="text-sm text-gray-400">You don't have any pending friend requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between p-3 border border-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                  <img
                    src={suggestion.avatar || "/placeholder.svg"}
                    alt={suggestion.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{suggestion.name}</p>
                  <p className="text-sm text-gray-400">{suggestion.mutualFriends} mutual friends</p>
                </div>
              </div>
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

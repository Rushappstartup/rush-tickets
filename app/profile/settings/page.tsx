import { ArrowLeft, Bell, LogOut, Moon, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="container px-4 py-6">
      <header className="flex items-center gap-4 mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-pink-500" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-400">john.smith@example.com</p>
              </div>
              <Button variant="ghost" size="sm" className="text-pink-500">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-400">+1 (305) 555-1234</p>
              </div>
              <Button variant="ghost" size="sm" className="text-pink-500">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-400">Last changed 3 months ago</p>
              </div>
              <Button variant="ghost" size="sm" className="text-pink-500">
                Change
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-pink-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Event notifications</p>
                <p className="text-sm text-gray-400">Get updates about events you're interested in</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Price alerts</p>
                <p className="text-sm text-gray-400">Be notified about price drops</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Ticket resale</p>
                <p className="text-sm text-gray-400">Get notified when your tickets are sold</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Moon className="h-5 w-5 text-pink-500" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode" className="cursor-pointer">
                <p className="font-medium">Dark mode</p>
              </Label>
            </div>
            <Switch id="dark-mode" defaultChecked />
          </div>
        </div>

        <div className="pt-4">
          <Button variant="destructive" className="w-full flex gap-2 justify-center">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}

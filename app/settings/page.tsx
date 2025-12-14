import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, CreditCard, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const creditHistory = [
    { date: "2024-01-15", action: "Resume Analysis", credits: -10 },
    { date: "2024-01-14", action: "Mock Interview", credits: -25 },
    { date: "2024-01-12", action: "Monthly Top-up", credits: +100 },
    { date: "2024-01-10", action: "Social AI Post", credits: -5 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input defaultValue="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Roll Number</label>
                <Input defaultValue="CS2024001" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input defaultValue="john.doe@university.edu" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <Input defaultValue="Computer Science" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Credit Usage</h2>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Credits Used</span>
              <span className="text-sm font-medium">150 / 1000</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "15%" }} />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Recent Activity</h3>
            {creditHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className={`text-sm font-semibold ${item.credits > 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.credits > 0 ? "+" : ""}
                  {item.credits}
                </span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View Full History
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {["Email Notifications", "Interview Reminders", "Credit Alerts"].map((item) => (
              <label key={item} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">{item}</span>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Two-Factor Authentication</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

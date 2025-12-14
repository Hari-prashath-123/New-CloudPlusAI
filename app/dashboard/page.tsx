"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { FileText, MessageSquare, Coins, Clock, TrendingUp, Award } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push("/login")
      return
    }
    setUser(session.user)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const stats = [
    { label: "Resumes Analyzed", value: "127", icon: FileText, trend: "+12%" },
    { label: "Mock Interviews", value: "34", icon: MessageSquare, trend: "+8%" },
    { label: "Credits Remaining", value: "850", icon: Coins, trend: "-15" },
    { label: "Hours Saved", value: "48", icon: Clock, trend: "+24%" },
  ]

  const recentActivity = [
    { action: "Resume analyzed for Software Engineer role", time: "2 hours ago", type: "ats" },
    { action: "Completed mock interview for Data Analyst", time: "5 hours ago", type: "interview" },
    { action: "Generated career roadmap for ML Engineer", time: "1 day ago", type: "roadmap" },
    { action: "Created LinkedIn profile content", time: "2 days ago", type: "social" },
    { action: "Built resume using template", time: "3 days ago", type: "resume" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your AI tools today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-accent">{stat.trend}</span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <Award className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Start New Analysis</h3>
            <p className="text-sm text-muted-foreground">Upload a resume to check ATS compatibility</p>
          </Card>
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <MessageSquare className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold mb-1">Practice Interview</h3>
            <p className="text-sm text-muted-foreground">Take a mock interview with AI</p>
          </Card>
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <FileText className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Build Resume</h3>
            <p className="text-sm text-muted-foreground">Create a professional resume</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

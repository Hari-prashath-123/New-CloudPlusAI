"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type User } from "@/lib/supabase"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Coins, Clock, TrendingUp, Award, LogOut } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push("/login")
      return
    }

    // Fetch user data from users table
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (error) {
      // If user not found in users table, create entry
      if (error.code === 'PGRST116') {
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([{
            id: session.user.id,
            email: session.user.email || "",
            full_name: session.user.user_metadata?.full_name || "User",
            role: "user",
            credits: 100,
          }])
          .select()
          .single()

        if (insertError) {
          console.error("Error creating user entry:", insertError)
          await supabase.auth.signOut()
          router.push("/login")
          return
        }

        setUserData(newUser)
        setLoading(false)
        return
      }

      console.error("Error fetching user data:", error)
      router.push("/login")
      return
    }

    setUserData(user)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const stats = [
    { label: "Resumes Analyzed", value: "0", icon: FileText, trend: "0%" },
    { label: "Mock Interviews", value: "0", icon: MessageSquare, trend: "0%" },
    { label: "Credits Remaining", value: userData.credits.toString(), icon: Coins, trend: "Active" },
    { label: "Account Type", value: userData.role === "admin" ? "Admin" : "User", icon: Clock, trend: "Active" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              Welcome Back, {userData.full_name}!
            </h1>
            <p className="text-muted-foreground mt-1">{userData.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
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

        {/* Welcome Message */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                You have <span className="font-bold text-foreground">{userData.credits} credits</span> available. 
                Use them to access AI-powered tools for resume analysis, mock interviews, career planning, and more.
              </p>
              {userData.role === "admin" && (
                <Button 
                  variant="default" 
                  onClick={() => router.push("/admin")}
                  className="mt-2"
                >
                  Go to Admin Portal
                </Button>
              )}
            </div>
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

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (authError) throw authError
      if (!authData.user) throw new Error("Login failed")

      // Check user role from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, full_name")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        if (userError.code === 'PGRST116') {
          // User not in users table - create entry
          const { error: insertError } = await supabase
            .from("users")
            .insert([{
              id: authData.user.id,
              email: authData.user.email || email,
              full_name: authData.user.user_metadata?.full_name || "User",
              role: "user",
              credits: 100,
            }])
          
          if (insertError) {
            console.error("Error creating user entry:", insertError)
            setError("Account setup failed. Please contact support.")
            await supabase.auth.signOut()
            return
          }
          
          // Redirect regular user
          router.push("/dashboard")
          router.refresh()
          return
        }
        throw userError
      }

      // Redirect based on role
      if (userData?.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">CloudPlusAI</h1>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11"
                  autoComplete="current-password"
                  minLength={6}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Need help?
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Contact your administrator for account access
            </p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to CloudPlusAI's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

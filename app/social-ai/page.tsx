"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Copy, RefreshCw } from "lucide-react"

export default function SocialAIPage() {
  const [generated, setGenerated] = useState(false)

  const generatedPost = `🚀 Excited to share my latest project!

Built a full-stack e-commerce platform using React, Node.js, and MongoDB. This journey taught me so much about scalable architecture and user experience design.

Key features:
✨ Real-time inventory management
💳 Secure payment integration
📱 Fully responsive design
🔐 JWT authentication

Big thanks to the amazing dev community for the support! Always learning, always building. 💪

#WebDevelopment #React #NodeJS #FullStack #TechJourney`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Social AI</h1>
          <p className="text-muted-foreground mt-1">Generate engaging social media content with AI</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Content Generator</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Platform</label>
                <select className="w-full p-2 rounded-md border border-border bg-background">
                  <option>LinkedIn</option>
                  <option>Twitter / X</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Topic</label>
                <Input placeholder="e.g., My latest project" defaultValue="My latest project" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Goal</label>
                <Input placeholder="e.g., Share achievement" defaultValue="Share achievement" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Additional Context</label>
                <Textarea
                  placeholder="Add any specific details you want to include..."
                  className="min-h-[100px]"
                  defaultValue="Built an e-commerce platform with React and Node.js"
                />
              </div>
              <Button className="w-full" onClick={() => setGenerated(true)}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Post
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Generated Content</h2>
                {generated && (
                  <Button size="sm" variant="ghost">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {generated ? (
                <div className="space-y-4">
                  <div className="bg-secondary rounded-lg p-4 min-h-[300px] text-sm leading-relaxed whitespace-pre-line">
                    {generatedPost}
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">Generated content will appear here</p>
                </div>
              )}
            </Card>

            {generated && (
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-3">AI-Generated Image Suggestion</h3>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <img
                    src="/tech-project-dashboard.jpg"
                    alt="Generated content visual"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

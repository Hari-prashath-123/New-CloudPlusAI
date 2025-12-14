"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Sparkles } from "lucide-react"

export default function ChatbotsPage() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm your AI assistant. How can I help you today?" },
  ])

  const bots = [
    { name: "Career Advisor", description: "Get career guidance and advice", color: "bg-blue-500" },
    { name: "Study Buddy", description: "Help with study plans and concepts", color: "bg-green-500" },
    { name: "Code Helper", description: "Assistance with coding problems", color: "bg-purple-500" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">AI Chatbots</h1>
          <p className="text-muted-foreground mt-1">Chat with specialized AI assistants</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {bots.map((bot, index) => (
            <Card key={index} className="p-6 hover:border-primary transition-colors cursor-pointer">
              <div className={`h-12 w-12 rounded-full ${bot.color} flex items-center justify-center mb-4`}>
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{bot.name}</h3>
              <p className="text-sm text-muted-foreground">{bot.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">General Assistant</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 p-4 bg-secondary/30 rounded-lg">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

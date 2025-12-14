"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, CheckCircle2 } from "lucide-react"

export default function MockInterviewPage() {
  const [stage, setStage] = useState<"setup" | "interview" | "results">("setup")

  const conversation = [
    {
      role: "ai",
      message: "Hello! I'll be conducting your interview today. Let's start with: Can you tell me about yourself?",
    },
    { role: "user", message: "I'm a final year Computer Science student with a passion for web development..." },
    { role: "ai", message: "Great! Can you explain the difference between var, let, and const in JavaScript?" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Mock Interview</h1>
          <p className="text-muted-foreground mt-1">Practice interviews with AI interviewers</p>
        </div>

        {stage === "setup" && (
          <Card className="p-6 max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">Interview Setup</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Job Role</label>
                <Input placeholder="e.g., Frontend Developer" defaultValue="Frontend Developer" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Job Description (Optional)</label>
                <Textarea
                  placeholder="Paste job description here..."
                  className="min-h-[150px]"
                  defaultValue="Looking for a Frontend Developer with React experience..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Interview Type</label>
                <select className="w-full p-2 rounded-md border border-border bg-background">
                  <option>Technical</option>
                  <option>Behavioral</option>
                  <option>Mixed</option>
                </select>
              </div>
              <Button className="w-full" onClick={() => setStage("interview")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            </div>
          </Card>
        )}

        {stage === "interview" && (
          <div className="max-w-4xl">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Frontend Developer Interview</h2>
                <Button variant="destructive" size="sm" onClick={() => setStage("results")}>
                  End Interview
                </Button>
              </div>

              <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 p-4 bg-secondary/30 rounded-lg">
                {conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea placeholder="Type your answer..." className="min-h-[80px] resize-none" />
                <Button size="icon" className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {stage === "results" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold">Interview Complete!</h2>
                  <p className="text-muted-foreground">Here's your performance report</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card className="p-4 bg-secondary">
                  <div className="text-3xl font-bold text-primary">8.5/10</div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </Card>
                <Card className="p-4 bg-secondary">
                  <div className="text-3xl font-bold text-accent">7/8</div>
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                </Card>
                <Card className="p-4 bg-secondary">
                  <div className="text-3xl font-bold text-green-500">Strong</div>
                  <p className="text-sm text-muted-foreground">Communication</p>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Strengths</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Clear explanation of technical concepts</li>
                    <li>Good understanding of React fundamentals</li>
                    <li>Confident communication style</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Could provide more specific examples from past projects</li>
                    <li>Consider discussing performance optimization techniques</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={() => setStage("setup")}>Start New Interview</Button>
                <Button variant="outline">Download Report</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

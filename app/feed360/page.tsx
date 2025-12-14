"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, BarChart3, FileText, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Feed360Page() {
  const [view, setView] = useState<"list" | "builder" | "analytics">("list")

  const forms = [
    { name: "Course Feedback - Spring 2024", responses: 145, status: "active" },
    { name: "Teaching Evaluation", responses: 89, status: "active" },
    { name: "Campus Facilities Survey", responses: 234, status: "closed" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Feed360</h1>
            <p className="text-muted-foreground mt-1">Create surveys and analyze feedback</p>
          </div>
          <Button onClick={() => setView("builder")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Survey
          </Button>
        </div>

        {view === "list" && (
          <div className="space-y-4">
            {forms.map((form, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{form.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{form.responses} responses</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setView("analytics")}>
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {view === "builder" && (
          <Card className="p-6 max-w-3xl">
            <h2 className="text-xl font-semibold mb-6">Create New Survey</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Survey Title</label>
                <Input placeholder="Enter survey title..." />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Questions</h3>
                <Card className="p-4 bg-secondary">
                  <Input placeholder="Question 1" className="mb-3" />
                  <select className="w-full p-2 rounded-md border border-border bg-background">
                    <option>Text</option>
                    <option>Rating (1-5 stars)</option>
                    <option>Boolean (Yes/No)</option>
                  </select>
                </Card>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setView("list")}>Save Survey</Button>
                <Button variant="outline" onClick={() => setView("list")}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {view === "analytics" && (
          <div className="space-y-6">
            <Button variant="outline" onClick={() => setView("list")}>
              ← Back to Surveys
            </Button>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Course Feedback - Analytics</h2>

              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">145</div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">4.2</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">87%</div>
                  <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Question Breakdown</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <Progress value={stars * 20} className="flex-1" />
                      <span className="text-sm font-medium w-12 text-right">{stars * 20}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

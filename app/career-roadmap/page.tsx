"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Circle, Sparkles } from "lucide-react"

export default function CareerRoadmapPage() {
  const [generated, setGenerated] = useState(false)

  const roadmapSteps = [
    { title: "Master React Fundamentals", status: "completed", duration: "2-3 months" },
    { title: "Learn State Management (Redux)", status: "in-progress", duration: "1 month" },
    { title: "Backend with Node.js", status: "upcoming", duration: "2 months" },
    { title: "Database Design & SQL", status: "upcoming", duration: "1.5 months" },
    { title: "System Design Basics", status: "upcoming", duration: "2 months" },
    { title: "Build Portfolio Projects", status: "upcoming", duration: "3 months" },
  ]

  const linkedInAbout = `Passionate Full Stack Developer with a strong foundation in React and Node.js. Currently expanding my expertise in system design and cloud architecture. I love building scalable web applications that solve real-world problems.

With a keen interest in modern web technologies, I'm constantly learning and adapting to new frameworks and best practices. My goal is to contribute to innovative projects that make a positive impact on users' lives.

🔧 Technical Skills: React, TypeScript, Node.js, PostgreSQL, AWS
📚 Currently Learning: System Design, Microservices Architecture
🎯 Looking for: Full Stack Developer opportunities`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Career Roadmap</h1>
          <p className="text-muted-foreground mt-1">Plan your career path with AI-powered guidance</p>
        </div>

        {!generated ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Career Goal</h2>
              <Input placeholder="e.g., Full Stack Developer" className="mb-4" />
              <h3 className="text-sm font-medium mb-2">Current Skills</h3>
              <Textarea
                placeholder="List your current skills..."
                className="min-h-[150px]"
                defaultValue="React, JavaScript, HTML, CSS, Git"
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Experience Level</h2>
              <div className="space-y-3">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="level" className="h-4 w-4" />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Target Timeline</h3>
                <Input type="number" placeholder="Months" defaultValue="12" />
              </div>
              <Button className="w-full mt-6" onClick={() => setGenerated(true)}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Roadmap
              </Button>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Button variant="outline" onClick={() => setGenerated(false)}>
              ← Create New Roadmap
            </Button>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Your Personalized Roadmap</h2>
              <div className="space-y-4">
                {roadmapSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : step.status === "in-progress" ? (
                        <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">LinkedIn About Section</h2>
              <div className="bg-secondary rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line">
                {linkedInAbout}
              </div>
              <Button className="mt-4 bg-transparent" variant="outline">
                Copy to Clipboard
              </Button>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

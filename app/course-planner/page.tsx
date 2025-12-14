"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, BookOpen } from "lucide-react"

export default function CoursePlannerPage() {
  const [planned, setPlanned] = useState(false)

  const lessonPlan = [
    { week: "Week 1", topic: "Introduction to Data Structures", days: "Day 1-2: Arrays and Linked Lists" },
    { week: "Week 2", topic: "Stacks and Queues", days: "Day 3-4: Implementation and Applications" },
    { week: "Week 3", topic: "Trees and Graphs", days: "Day 5-7: Tree Traversals, Graph Basics" },
    { week: "Week 4", topic: "Sorting Algorithms", days: "Day 8-9: Quick Sort, Merge Sort" },
    { week: "Week 5", topic: "Dynamic Programming", days: "Day 10-12: Memoization, Tabulation" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Course Planner</h1>
          <p className="text-muted-foreground mt-1">Generate AI-powered lesson plans from your syllabus</p>
        </div>

        {!planned ? (
          <Card className="p-6 max-w-3xl">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Branch</label>
                <Input placeholder="e.g., Computer Science" defaultValue="Computer Science" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="e.g., Data Structures" defaultValue="Data Structures" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Syllabus Content</label>
                <Textarea
                  placeholder="Paste your syllabus here..."
                  className="min-h-[200px]"
                  defaultValue="Unit 1: Arrays, Linked Lists, Stacks, Queues
Unit 2: Trees, Binary Search Trees, AVL Trees
Unit 3: Graphs, Graph Traversal
Unit 4: Sorting and Searching Algorithms
Unit 5: Dynamic Programming"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration (weeks)</label>
                  <Input type="number" defaultValue="12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Hours per week</label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>
              <Button className="w-full" onClick={() => setPlanned(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Generate Lesson Plan
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setPlanned(false)}>
              ← Create New Plan
            </Button>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Data Structures - Lesson Plan</h2>
                  <p className="text-sm text-muted-foreground">12 weeks • 5 hours per week</p>
                </div>
              </div>

              <div className="space-y-4">
                {lessonPlan.map((lesson, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{lesson.week}</h3>
                        <p className="text-sm font-medium mt-1">{lesson.topic}</p>
                        <p className="text-sm text-muted-foreground mt-2">{lesson.days}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button>Download PDF</Button>
                <Button variant="outline">Export to Calendar</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

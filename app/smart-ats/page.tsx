"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SmartATSPage() {
  const [view, setView] = useState<"upload" | "results">("upload")

  const mockResults = [
    {
      name: "John_Doe_Resume.pdf",
      match: 87,
      summary: "Strong match with 15+ relevant keywords. Experience aligns well with requirements.",
    },
    {
      name: "Jane_Smith_Resume.pdf",
      match: 72,
      summary: "Good match but missing some key technical skills mentioned in description.",
    },
    {
      name: "Mike_Johnson_Resume.pdf",
      match: 94,
      summary: "Excellent match! Resume contains all required skills and relevant experience.",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Smart ATS</h1>
          <p className="text-muted-foreground mt-1">Analyze resume compatibility with job descriptions</p>
        </div>

        {view === "upload" ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Resume Upload */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Resumes</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">Drop resumes here or click to browse</p>
                <p className="text-xs text-muted-foreground">Supports PDF, DOCX (Max 10MB)</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Resume_1.pdf</span>
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Resume_2.pdf</span>
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Job Description</h2>
              <Textarea
                placeholder="Paste the job description here..."
                className="min-h-[300px] resize-none"
                defaultValue="We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and TypeScript..."
              />
              <Button className="w-full mt-4" onClick={() => setView("results")}>
                Analyze Resumes
              </Button>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setView("upload")}>
                ← Back to Upload
              </Button>
            </div>

            {mockResults.map((result, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">Analyzed 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{result.match}%</div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                </div>
                <Progress value={result.match} className="mb-3" />
                <p className="text-sm text-muted-foreground">{result.summary}</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Download Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

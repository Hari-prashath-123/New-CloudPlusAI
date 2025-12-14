"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, GraduationCap, Briefcase, Code, LinkIcon, Award } from "lucide-react"

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState("personal")

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Award },
    { id: "links", label: "Social Links", icon: LinkIcon },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Resume Builder</h1>
          <p className="text-muted-foreground mt-1">Create a professional resume with ease</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className="whitespace-nowrap"
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              {activeTab === "personal" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <Input placeholder="Full Name" defaultValue="John Doe" />
                  <Input placeholder="Email" defaultValue="john.doe@email.com" />
                  <Input placeholder="Phone" defaultValue="+1 234 567 8900" />
                  <Input placeholder="Location" defaultValue="San Francisco, CA" />
                  <Textarea placeholder="Professional Summary" className="min-h-[100px]" />
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Education</h2>
                  <Input placeholder="Degree" defaultValue="B.Tech in Computer Science" />
                  <Input placeholder="Institution" defaultValue="XYZ University" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Start Year" defaultValue="2020" />
                    <Input placeholder="End Year" defaultValue="2024" />
                  </div>
                  <Input placeholder="GPA / Percentage" defaultValue="8.5 GPA" />
                  <Button variant="outline" size="sm">
                    + Add Another
                  </Button>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
                  <Input placeholder="Job Title" defaultValue="Software Engineering Intern" />
                  <Input placeholder="Company" defaultValue="Tech Corp" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Start Date" defaultValue="Jan 2023" />
                    <Input placeholder="End Date" defaultValue="Jun 2023" />
                  </div>
                  <Textarea placeholder="Responsibilities & Achievements" className="min-h-[100px]" />
                  <Button variant="outline" size="sm">
                    + Add Another
                  </Button>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Projects</h2>
                  <Input placeholder="Project Name" defaultValue="E-commerce Platform" />
                  <Input placeholder="Technologies Used" defaultValue="React, Node.js, MongoDB" />
                  <Textarea placeholder="Description" className="min-h-[100px]" />
                  <Input placeholder="Project Link (optional)" />
                  <Button variant="outline" size="sm">
                    + Add Another
                  </Button>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Skills</h2>
                  <Textarea
                    placeholder="Enter skills (comma separated)"
                    className="min-h-[150px]"
                    defaultValue="React, JavaScript, TypeScript, Node.js, MongoDB, Git, Docker, AWS"
                  />
                </div>
              )}

              {activeTab === "links" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Social Links</h2>
                  <Input placeholder="GitHub" defaultValue="github.com/johndoe" />
                  <Input placeholder="LinkedIn" defaultValue="linkedin.com/in/johndoe" />
                  <Input placeholder="Portfolio Website" />
                  <Input placeholder="Twitter / X" />
                </div>
              )}
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="p-8 bg-card sticky top-24">
              <h2 className="text-sm font-medium text-muted-foreground mb-4">LIVE PREVIEW</h2>
              <div className="space-y-6 text-sm">
                <div>
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">john.doe@email.com • +1 234 567 8900</p>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">EDUCATION</h3>
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-medium">B.Tech in Computer Science</p>
                    <p className="text-muted-foreground">XYZ University • 2020 - 2024</p>
                    <p className="text-muted-foreground">GPA: 8.5</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">EXPERIENCE</h3>
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-medium">Software Engineering Intern</p>
                    <p className="text-muted-foreground">Tech Corp • Jan 2023 - Jun 2023</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">SKILLS</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "JavaScript", "TypeScript", "Node.js", "MongoDB"].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1">Download PDF</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save Draft
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

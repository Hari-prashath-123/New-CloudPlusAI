"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  GraduationCap,
  Search,
  ExternalLink,
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react"

const scholarships = [
  {
    id: 1,
    title: "Merit Excellence Scholarship",
    provider: "Tech Foundation",
    amount: "$5,000",
    deadline: "2024-03-15",
    eligibility: "GPA 3.5+",
    category: "Merit-Based",
    applicants: 1250,
    description: "For students demonstrating academic excellence in STEM fields",
    requirements: ["3.5+ GPA", "STEM Major", "Essay Required"],
    status: "Open",
  },
  {
    id: 2,
    title: "Women in Technology Grant",
    provider: "Women Tech Leaders",
    amount: "$7,500",
    deadline: "2024-04-01",
    eligibility: "Female CS Students",
    category: "Diversity",
    applicants: 890,
    description: "Supporting women pursuing careers in computer science and engineering",
    requirements: ["Female Student", "CS/Engineering Major", "Recommendation Letter"],
    status: "Open",
  },
  {
    id: 3,
    title: "Community Service Award",
    provider: "Civic Engagement Fund",
    amount: "$3,000",
    deadline: "2024-03-30",
    eligibility: "50+ Volunteer Hours",
    category: "Service",
    applicants: 670,
    description: "Recognizing students making a difference in their communities",
    requirements: ["50+ Volunteer Hours", "Community Project", "Recommendation Letter"],
    status: "Open",
  },
  {
    id: 4,
    title: "First-Generation College Fund",
    provider: "Education Access Initiative",
    amount: "$10,000",
    deadline: "2024-05-15",
    eligibility: "First-Gen Students",
    category: "Need-Based",
    applicants: 2100,
    description: "Supporting first-generation college students in their educational journey",
    requirements: ["First-Gen Status", "Financial Need", "Personal Statement"],
    status: "Open",
  },
  {
    id: 5,
    title: "Innovation Challenge Grant",
    provider: "Startup Accelerator",
    amount: "$15,000",
    deadline: "2024-02-28",
    eligibility: "Entrepreneurship Projects",
    category: "Innovation",
    applicants: 450,
    description: "Funding innovative student-led startup projects and business ideas",
    requirements: ["Business Proposal", "Prototype/MVP", "Pitch Presentation"],
    status: "Closing Soon",
  },
  {
    id: 6,
    title: "International Student Excellence",
    provider: "Global Education Fund",
    amount: "$8,000",
    deadline: "2024-04-20",
    eligibility: "International Students",
    category: "International",
    applicants: 1580,
    description: "Supporting international students achieving academic excellence",
    requirements: ["International Status", "3.0+ GPA", "Cultural Essay"],
    status: "Open",
  },
]

const stats = [
  { label: "Total Scholarships", value: "150+", icon: Award, color: "text-blue-500" },
  { label: "Total Funding", value: "$2.5M", icon: DollarSign, color: "text-green-500" },
  { label: "Applications Submitted", value: "432", icon: Users, color: "text-purple-500" },
  { label: "Success Rate", value: "68%", icon: TrendingUp, color: "text-orange-500" },
]

export default function ScholarshipBoothPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Merit-Based", "Need-Based", "Diversity", "Service", "Innovation", "International"]

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-pretty">Scholarship Booth</h1>
          <p className="text-muted-foreground mt-2 text-pretty">
            Discover and apply for scholarships tailored to your profile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scholarships by name, provider, or keywords..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="browse" className="space-y-4">
          <TabsList>
            <TabsTrigger value="browse" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Browse All
            </TabsTrigger>
            <TabsTrigger value="recommended" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Recommended
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Award className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredScholarships.length} of {scholarships.length} scholarships
              </p>
            </div>

            {/* Scholarship Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight line-clamp-2">{scholarship.title}</CardTitle>
                        <CardDescription className="mt-1">{scholarship.provider}</CardDescription>
                      </div>
                      <Badge
                        variant={scholarship.status === "Closing Soon" ? "destructive" : "default"}
                        className="shrink-0"
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{scholarship.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-green-500">{scholarship.amount}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{scholarship.applicants.toLocaleString()} applicants</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{scholarship.eligibility}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {scholarship.requirements.slice(0, 2).map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {scholarship.requirements.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{scholarship.requirements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-4">
            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Personalized Recommendations Coming Soon</h3>
                <p className="text-muted-foreground">
                  Complete your profile to get AI-powered scholarship recommendations
                </p>
                <Button className="mt-4">Complete Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Saved Scholarships</h3>
                <p className="text-muted-foreground">Start saving scholarships to track them here</p>
                <Button className="mt-4 bg-transparent" variant="outline">
                  Browse Scholarships
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

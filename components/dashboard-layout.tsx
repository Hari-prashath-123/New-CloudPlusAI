"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileSearch,
  Map,
  Calendar,
  ClipboardList,
  MessageSquare,
  FileText,
  Share2,
  Bot,
  Settings,
  Menu,
  X,
  GraduationCap,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Smart ATS", href: "/smart-ats", icon: FileSearch },
  { name: "Career Roadmap", href: "/career-roadmap", icon: Map },
  { name: "Course Planner", href: "/course-planner", icon: Calendar },
  { name: "Feed360", href: "/feed360", icon: ClipboardList },
  { name: "Mock Interview", href: "/mock-interview", icon: MessageSquare },
  { name: "Resume Builder", href: "/resume-builder", icon: FileText },
  { name: "Social AI", href: "/social-ai", icon: Share2 },
  { name: "Scholarship Booth", href: "/scholarship-booth", icon: GraduationCap },
  { name: "Chatbots", href: "/chatbots", icon: Bot },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image src="/logo.png" alt="CloudPlusAI" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold">CloudPlusAI</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex-1" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Credits Badge */}
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <span className="text-xs text-muted-foreground">Credits:</span>
            <span className="text-sm font-semibold text-primary">850</span>
            <span className="text-xs text-muted-foreground">/ 1000</span>
          </Badge>

          {/* User Avatar */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="/abstract-geometric-shapes.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

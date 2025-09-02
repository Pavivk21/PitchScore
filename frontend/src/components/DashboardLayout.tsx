import { ReactNode } from "react"
import { 
  Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, 
  SidebarMenuItem, SidebarProvider, SidebarFooter 
} from "./ui/sidebar"
import { 
  Building2, MessageSquare, TrendingUp, Users, Upload, BarChart3, 
  Handshake, Sparkles, LogOut, User 
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Separator } from "./ui/separator"

interface User {
  email: string
  firstName: string
  lastName: string
  company: string
  userType: "client" | "investor"
}

interface DashboardLayoutProps {
  children: ReactNode
  activeView: string
  onViewChange: (view: string) => void
  user?: User | null
  onLogout?: () => void
}

export function DashboardLayout({
  children,
  activeView,
  onViewChange,
  user,
  onLogout,
}: DashboardLayoutProps) {
  // derive current mode from activeView
  const userMode = activeView.startsWith("client") ? "client" : "investor"

  const clientMenuItems = [
    { id: "submit", label: "Submit Pitch", icon: Upload, color: "text-blue-500" },
    { id: "feedback", label: "AI Feedback", icon: TrendingUp, color: "text-green-500", badge: "New" },
    { id: "reports", label: "Reports", icon: BarChart3, color: "text-purple-500" },
    { id: "chat", label: "Messages", icon: MessageSquare, color: "text-orange-500", badge: "3" },
    { id: "partnerships", label: "Partnerships", icon: Handshake, color: "text-pink-500" },
  ]

  const investorMenuItems = [
    { id: "review", label: "Review Pitches", icon: Building2, color: "text-blue-500", badge: "12" },
    { id: "chat", label: "Messages", icon: MessageSquare, color: "text-orange-500", badge: "5" },
    { id: "partnerships", label: "Partnerships", icon: Users, color: "text-pink-500" },
  ]

  const menuItems = userMode === "client" ? clientMenuItems : investorMenuItems

  const getUserInitials = () => {
    if (!user) return "U"
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        
        {/* Sidebar */}
        <Sidebar className="border-r border-white/20 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
          <SidebarHeader>
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Shark Tank
                  </h2>
                  <p className="text-xs text-muted-foreground">Virtual Pitch Platform</p>
                </div>
              </div>

              {/* Mode Switch */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewChange("client-submit")}
                  className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                    userMode === "client"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "bg-white/50 text-muted-foreground hover:bg-white/80 hover:text-foreground"
                  }`}
                >
                  Client
                </button>
                <button
                  onClick={() => onViewChange("investor-review")}
                  className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                    userMode === "investor"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "bg-white/50 text-muted-foreground hover:bg-white/80 hover:text-foreground"
                  }`}
                >
                  Investor
                </button>
              </div>
            </div>
          </SidebarHeader>
          
          {/* Menu */}
          <SidebarContent>
            <SidebarMenu className="px-4">
              {menuItems.map((item) => {
                const itemKey = `${userMode}-${item.id}`
                const isActive = activeView === itemKey
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(itemKey)}
                      isActive={isActive}
                      className="group relative rounded-xl mb-2 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <item.icon className={`w-5 h-5 ${item.color} transition-transform group-hover:scale-110`} />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={item.badge === "New" ? "default" : "secondary"}
                            className="ml-auto text-xs px-2 py-1"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          {/* User Info & Actions */}
          {user && (
            <SidebarFooter>
              <div className="p-4 space-y-4">
                <Separator />
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user.company}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {user.userType === "client" ? "Entrepreneur" : "Investor"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => onViewChange("profile")}
                  >
                    <User className="w-4 h-4" />
                    Profile Settings
                  </Button>
                  {onLogout && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onLogout}
                      className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  )}
                </div>
              </div>
            </SidebarFooter>
          )}
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}

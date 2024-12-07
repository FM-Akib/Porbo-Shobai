
import { cn } from "@/lib/utils"
import { BookOpen, BadgeIcon as Certificate, Gift, Home, LogOut, Settings, Star, UserCircle, Users, Clock } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"

const routes = [
  {
    label: "Profile",
    icon: UserCircle,
    href: "/dashboard/profile",
  },
  {
    label: "Registration",
    icon: Users,
    href: "/dashboard/registration",
  },
  {
    label: "Referrals",
    icon: Star,
    href: "/dashboard/referrals",
  },
  {
    label: "My Rounds",
    icon: Clock,
    href: "/dashboard/rounds",
  },
  {
    label: "Watchlist",
    icon: Home,
    href: "/dashboard/watchlist",
  },
  {
    label: "Mentor Sessions",
    icon: Users,
    href: "/dashboard/mentor",
  },
  {
    label: "Courses",
    icon: BookOpen,
    href: "/dashboard/courses",
  },
  {
    label: "Certificates",
    icon: Certificate,
    href: "/dashboard/certificates",
  },
  {
    label: "Rewards",
    icon: Gift,
    href: "/dashboard/rewards",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function SidebarNav() {
  const pathname = useLocation().pathname

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === route.href ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </div>
  )
}



import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Facebook, Linkedin, Youtube, Building2, User2, MapPin, Star } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const MentorRequestCard = ({ mentor, path }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const {
    _id,
    firstName,
    lastName,
    gender,
    organisation,
    domain,
    linkedinUrl,
    facebookUrl,
    youtubeUrl,
    protfolioUrl,
    image,
  } = mentor

  const handleProfileClick = (e) => {
    e.stopPropagation()
    navigate(`${path}/${_id}`);
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
  }

  // Generate a gradient based on the domain
  const getGradient = () => {
    const gradients = {
      
      default: "from-gray-700 via-gray-900 to-black",
    }

    return gradients[domain] || gradients.default
  }

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Decorative background elements */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${getGradient()} rounded-2xl opacity-70 blur-sm group-hover:opacity-100 group-hover:blur transition duration-500 animate-pulse-slow`}
      ></div>

      <Card className="relative h-full overflow-hidden rounded-xl border-0 bg-background/80 backdrop-blur-sm shadow-xl transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-2xl">
        {/* Top gradient bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${getGradient()}`}></div>

        <div className="p-6 flex flex-col h-full">
          {/* Avatar and name section */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div
                className={`absolute -inset-1 rounded-full bg-gradient-to-r ${getGradient()} opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition duration-500`}
              ></div>
              <Avatar className="h-16 w-16 border-2 border-background relative">
                <AvatarImage src={image} alt={`${firstName} ${lastName}`} className="object-cover" />
                <AvatarFallback className={`bg-gradient-to-br ${getGradient()} text-white font-bold`}>
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {firstName} {lastName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={`bg-gradient-to-r ${getGradient()} text-white border-0 px-2 py-0.5 text-xs font-medium`}
                >
                  {domain}
                </Badge>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current opacity-40" />
                </div>
              </div>
            </div>
          </div>

          {/* Mentor details with animated icons */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <User2 className="h-3.5 w-3.5 text-primary" />
              </div>
              <span>{gender}</span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Building2 className="h-3.5 w-3.5 text-primary" />
              </div>
              <span>{organisation}</span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <MapPin className="h-3.5 w-3.5 text-primary" />
              </div>
              <span>Remote Available</span>
            </div>
          </div>

          {/* Social links with animated hover effects */}
          <div className="flex gap-2 mt-auto">
            {protfolioUrl && (
              <Link
                to={protfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-br ${getGradient()} text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300`}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Portfolio</span>
              </Link>
            )}
            {linkedinUrl && (
              <Link
                to={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-9 w-9 rounded-full flex items-center justify-center bg-[#0077B5] text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300`}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            )}
            {facebookUrl && (
              <Link
                to={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-9 w-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300`}
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
            )}
            {youtubeUrl && (
              <Link
                to={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-9 w-9 rounded-full flex items-center justify-center bg-[#FF0000] text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300`}
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Link>
            )}

            <Button
              onClick={handleProfileClick}
              className={`ml-auto bg-gradient-to-r ${getGradient()} text-white border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              View Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Animated spotlight effect */}
      {isHovered && (
        <div className="absolute -inset-40 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none radial-gradient"></div>
      )}
    </div>
  )
}

export default MentorRequestCard


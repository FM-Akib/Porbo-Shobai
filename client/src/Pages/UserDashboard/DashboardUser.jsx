
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Share2, Trophy, Briefcase, GraduationCap, Award, FolderGit2,  Heart, Flame, Plus } from 'lucide-react'
import { EditDialog } from '@/components/DashboardUser/EditDialog'

// Sample data
const initialProfile = {
  name: "Sarah Johnson",
  username: "@sarahj",
  university: "International Islamic University",
  location: "Chittagong",
  points: 1250,
  badges: 8,
  coins: 300,
  about: "Passionate developer with a keen interest in UI/UX design and web development.",
  skills: ["React", "Node.js", "TypeScript", "UI/UX Design", "Tailwind CSS"],
  workExperience: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      duration: "2021 - Present",
      description: "Leading frontend development for various projects."
    },
    {
      title: "Web Developer",
      company: "Digital Creatives",
      duration: "2019 - 2021",
      description: "Developed and maintained client websites."
    }
  ],
  education: [
    {
      degree: "BSc in Computer Science",
      institution: "International Islamic University",
      year: "2019",
      result: "3.8 GPA"
    }
  ],
  certificates: [
    { title: "Advanced React Development", image: "/placeholder.svg" },
    { title: "UI/UX Design Fundamentals", image: "/placeholder.svg" },
    { title: "Node.js Master Class", image: "/placeholder.svg" }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      skills: ["React", "Node.js", "MongoDB"],
      link: "https://example.com/ecommerce",
      details: "A full-stack e-commerce solution.",
      image: "/placeholder.svg"
    },
    {
      name: "Social Media Dashboard",
      skills: ["Vue.js", "Express", "PostgreSQL"],
      link: "https://example.com/dashboard",
      details: "Analytics dashboard for social media managers.",
      image: "/placeholder.svg"
    }
  ],
  achievements: [
    { title: "Best Developer Award 2023", image: "/placeholder.svg" },
    { title: "Hackathon Winner", image: "/placeholder.svg" },
    { title: "100 Days of Code Champion", image: "/placeholder.svg" }
  ],
  hobbies: ["Photography", "Blogging", "Open Source Contributing"]
}

export default function DashboardUser() {
  const [profile, setProfile] = useState(initialProfile)
  const [streakCount, setStreakCount] = useState(5)

  const updateProfile = (section, newData) => {
    setProfile(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) ? [...prev[section], newData] : newData
    }))
  }

  return (
    <div className="container mx-auto p-2 md:p-6">
      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-6 ">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">{profile.username}</p>
                </div>
                <p className="text-sm text-center">{profile.university}</p>
                <p className="text-sm text-muted-foreground">{profile.location}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rankings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Points</span>
                <Badge variant="secondary">{profile.points}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Badges</span>
                <Badge variant="secondary">{profile.badges}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Your coins</span>
                <span className="font-bold">{profile.coins}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Redeem coins
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">About</CardTitle>
              <EditDialog
                trigger={<Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>}
                title="Edit About"
                onSave={(data) => updateProfile('about', data.about)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({ about: e.target.about.value })
                  }}>
                    <Textarea 
                      name="about"
                      defaultValue={profile.about}
                      className="mb-4"
                    />
                    <Button type="submit">Save</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{profile.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Skills</CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Skill"
                onSave={(data) => updateProfile('skills', data.skill)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({ skill: e.target.skill.value })
                  }}>
                    <Input 
                      name="skill"
                      placeholder="Enter skill"
                      className="mb-4"
                    />
                    <Button type="submit">Add Skill</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Work Experience
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Work Experience"
                onSave={(data) => updateProfile('workExperience', data)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({
                      title: e.target.title.value,
                      company: e.target.company.value,
                      duration: e.target.duration.value,
                      description: e.target.description.value,
                    })
                  }}>
                    <Input name="title" placeholder="Designation" className="mb-2" />
                    <Input name="company" placeholder="Institution/Company" className="mb-2" />
                    <Input name="duration" placeholder="Duration" className="mb-2" />
                    <Textarea name="description" placeholder="Description" className="mb-4" />
                    <Button type="submit">Add Experience</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.workExperience.map((work, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.company}</p>
                  <p className="text-sm text-muted-foreground">{work.duration}</p>
                  <p className="text-sm">{work.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Education
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Education"
                onSave={(data) => updateProfile('education', data)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({
                      degree: e.target.degree.value,
                      institution: e.target.institution.value,
                      year: e.target.year.value,
                      result: e.target.result.value,
                    })
                  }}>
                    <Input name="degree" placeholder="Degree" className="mb-2" />
                    <Input name="institution" placeholder="Institution Name" className="mb-2" />
                    <Input name="year" placeholder="Year" className="mb-2" />
                    <Input name="result" placeholder="Result" className="mb-4" />
                    <Button type="submit">Add Education</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  <p className="text-sm">{edu.result}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Certificates
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Certificate"
                onSave={(data) => updateProfile('certificates', data)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({
                      title: e.target.title.value,
                      image: e.target.image.value,
                    })
                  }}>
                    <Input name="title" placeholder="Title" className="mb-2" />
                    <Input name="image" type="file" accept="image/*" className="mb-4" />
                    <Button type="submit">Add Certificate</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {profile.certificates.map((cert, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{cert.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <FolderGit2 className="mr-2 h-5 w-5" />
                Projects
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Project"
                onSave={(data) => updateProfile('projects', data)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({
                      name: e.target.name.value,
                      skills: e.target.skills.value.split(',').map(skill => skill.trim()),
                      link: e.target.link.value,
                      details: e.target.details.value,
                      image: e.target.image.value,
                    })
                  }}>
                    <Input name="name" placeholder="Project Name" className="mb-2" />
                    <Input name="skills" placeholder="Skills (comma-separated)" className="mb-2" />
                    <Input name="link" placeholder="Link" className="mb-2" />
                    <Textarea name="details" placeholder="Details" className="mb-2" />
                    <Input name="image" type="file" accept="image/*" className="mb-4" />
                    <Button type="submit">Add Project</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {profile.projects.map((project, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {project.name} - {project.skills.join(', ')}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Achievement"
                onSave={(data) => updateProfile('achievements', data)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({
                      title: e.target.title.value,
                      image: e.target.image.value,
                    })
                  }}>
                    <Input name="title" placeholder="Title" className="mb-2" />
                    <Input name="image" type="file" accept="image/*" className="mb-4" />
                    <Button type="submit">Add Achievement</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {profile.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{achievement.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Hobbies
              </CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Hobby"
                onSave={(data) => updateProfile('hobbies', data.hobby)}
              >
                {(onSave) => (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    onSave({ hobby: e.target.hobby.value })
                  }}>
                    <Input name="hobby" placeholder="Enter hobby" className="mb-4" />
                    <Button type="submit">Add Hobby</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="secondary">{hobby}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Flame className="mr-2 h-5 w-5" />
                Streaks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-8 w-8 rounded-md flex items-center justify-center ${
                      index < streakCount ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {index < streakCount ? '✓' : ''}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


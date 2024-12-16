import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Share2, Trophy, Briefcase, GraduationCap, Award, FolderGit2, Heart, Flame, Plus } from 'lucide-react'
import useUserInfo from '@/Hooks/useUserInfo'
import { EditDialog } from '@/components/DashboardUser/EditDialog'

function DashboardUser() {
  const {userInfo} = useUserInfo()
  const [profile, setProfile] = useState(userInfo)

  const editProfile = (data) => {
    setProfile(prev => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
      institution: data.institution,
      location: data.location
    }))
  }

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
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.image || "/placeholder.svg"} />
                  <AvatarFallback>{profile.firstName?.[0]}{profile.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-sm text-muted-foreground">{profile.username}</p>
                </div>
                <p className="text-sm text-center">{profile.institution || 'Add your institution'}</p>
                <p className="text-sm text-muted-foreground">{profile.location || 'Add your location'}</p>
                <div className="flex gap-2">
                  <EditDialog 
                    trigger={
                      <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    }
                    title="Edit Profile"
                    onSave={editProfile}
                  >
                    {(onSave) => (
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target)
                        const data = Object.fromEntries(formData)
                        onSave(data)
                      }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="firstName" className="text-right">First Name</label>
                            <Input id="firstName" name="firstName" defaultValue={profile.firstName} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="lastName" className="text-right">Last Name</label>
                            <Input id="lastName" name="lastName" defaultValue={profile.lastName} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="image" className="text-right">Image URL</label>
                            <Input id="image" name="image" defaultValue={profile.image} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="institution" className="text-right">Institution</label>
                            <Input id="institution" name="institution" defaultValue={profile.institution} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="location" className="text-right">Location</label>
                            <Input id="location" name="location" defaultValue={profile.location} className="col-span-3" />
                          </div>
                        </div>
                        <Button type="submit">Save changes</Button>
                      </form>
                    )}
                  </EditDialog>
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
                <Badge variant="secondary">{profile.points || 0}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Badges</span>
                <Badge variant="secondary">{profile.badges?.length || 0}</Badge>
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
                <span className="font-bold">{profile.coins || 0}</span>
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
                      defaultValue={profile.about || ''}
                      className="mb-4"
                      placeholder="Add a short bio about yourself"
                    />
                    <Button type="submit">Save</Button>
                  </form>
                )}
              </EditDialog>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{profile.about || 'Add a short bio about yourself'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Skills</CardTitle>
              <EditDialog 
                trigger={<Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
                title="Add Skill"
                onSave={(data) => updateProfile('skills', [...(profile.skills || []), data.skill])}
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
                {profile.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                )) || <p>No skills added yet</p>}
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
                onSave={(data) => updateProfile('workExperience', [...(profile.workExperience || []), data])}
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
              {profile.workExperience?.map((work, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.company}</p>
                  <p className="text-sm text-muted-foreground">{work.duration}</p>
                  <p className="text-sm">{work.description}</p>
                </div>
              )) || <p>No work experience added yet</p>}
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
                onSave={(data) => updateProfile('education', [...(profile.education || []), data])}
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
              {profile.education?.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  <p className="text-sm">{edu.result}</p>
                </div>
              )) || <p>No education added yet</p>}
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
                onSave={(data) => updateProfile('certificates', [...(profile.certificates || []), data])}
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
                {profile.certificates?.map((cert, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{cert.title}</li>
                )) || <p>No certificates added yet</p>}
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
                onSave={(data) => updateProfile('projects', [...(profile.projects || []), data])}
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
                {profile.projects?.map((project, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {project.name} - {project.skills.join(', ')}
                  </li>
                )) || <p>No projects added yet</p>}
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
                onSave={(data) => updateProfile('achievements', [...(profile.achievements || []), data])}
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
                {profile.achievements?.map((achievement, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{achievement.title}</li>
                )) || <p>No achievements added yet</p>}
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
                onSave={(data) => updateProfile('hobbies', [...(profile.hobbies || []), data.hobby])}
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
                {profile.hobbies?.map((hobby, index) => (
                  <Badge key={index} variant="secondary">{hobby}</Badge>
                )) || <p>No hobbies added yet</p>}
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
                      index < (profile.streaks?.length || 0) ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {index < (profile.streaks?.length || 0) ? '✓' : ''}
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

export default DashboardUser


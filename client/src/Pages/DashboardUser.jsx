import { FormDialog } from "@/components/DashboardUser/FromDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
const initialProfile = {
    about: "",
    skills: [],
    workExperience: [],
    education: [],
    achievements: [],
    hobbies: [],
  }
  
const DashboardUser = () => {
    const [profile, setProfile] = useState(initialProfile)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentForm, setCurrentForm] = useState('about')
    const [unsavedChanges, setUnsavedChanges] = useState(false)
  
    useEffect(() => {
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
    }, [])
  
    const handleSave = (data) => {
      const newProfile = { ...profile }
      
      switch (currentForm) {
        case 'about':
          newProfile.about = data.about
          break
        case 'skills':
          newProfile.skills = [...profile.skills, data.skill]
          break
        case 'workExperience':
          newProfile.workExperience = [...profile.workExperience, data]
          break
        // Add other cases here...
      }
  
      setProfile(newProfile)
      setUnsavedChanges(true)
    }
  
    const handleSaveAll = () => {
      localStorage.setItem('userProfile', JSON.stringify(profile))
      setUnsavedChanges(false)
    }
  
    const openDialog = (type) => {
      setCurrentForm(type)
      setDialogOpen(true)
    }
    return (
        <>
        <div className="flex h-[60px] items-center justify-between border-b px-6">
          <h1 className="font-semibold">Profile</h1>
          {unsavedChanges && (
            <Button onClick={handleSaveAll}>Save All Changes</Button>
          )}
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">About</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => openDialog('about')}>
                  {profile.about ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {profile.about || "Add your bio..."}
                </p>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skills</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => openDialog('skills')}>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">Add your skills...</p>
                  )}
                </div>
              </CardContent>
            </Card>
  
            {/* Add other sections here... */}
          </div>
        </div>
        <FormDialog
          type={currentForm}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave}
        />
      </>
    );
};

export default DashboardUser;
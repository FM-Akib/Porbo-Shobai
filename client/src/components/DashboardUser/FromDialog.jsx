
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"



export function FormDialog({ type, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setFormData({})
    onOpenChange(false)
  }

  const renderFields = () => {
    switch (type) {
      case 'about':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about || ''}
                onChange={(e) => setFormData({ about: e.target.value })}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        )
      case 'skills':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="skill">Skill Name</Label>
              <Input
                id="skill"
                value={formData.skill || ''}
                onChange={(e) => setFormData({ skill: e.target.value })}
                placeholder="Enter skill name"
              />
            </div>
          </div>
        )
      case 'workExperience':
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input
                id="institutionName"
                value={formData.institutionName || ''}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="institutionLink">Institution Link</Label>
              <Input
                id="institutionLink"
                value={formData.institutionLink || ''}
                onChange={(e) => setFormData({ ...formData, institutionLink: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={formData.skills || ''}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })}
              />
            </div>
          </div>
        )
      // Add other form types here...
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
          <DialogDescription>
            Fill in the details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


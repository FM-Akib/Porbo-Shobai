import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function EditDialog({ trigger, title, children, onSave }) {
  const [open, setOpen] = useState(false)

  const handleSave = (data) => {
    console.log('Saving data:', data)
    onSave(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {typeof children === 'function' ? children(handleSave) : children}
      </DialogContent>
    </Dialog>
  )
}


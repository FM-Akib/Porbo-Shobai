import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const CreateMeetingLinkDialog = ({ onSubmit, refetch, refetch2, id }) => {
  const [meetingLink, setMeetingLink] = useState("");
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  console.log(id)
  const handleSubmit = () => {
    if (meetingLink) {
      onSubmit(meetingLink);
      setMeetingLink("");
      setOpen(false); 
      console.log("Submitted Meeting Link:", meetingLink);

      axiosSecure
        .patch(`/meeting-link/${id}`, { meetingURL: meetingLink })
        .then((response) => {
          console.log("Meeting link updated:", response.data);
          refetch();
          refetch2();
        })
        .catch((error) => {
          console.error("Error updating meeting link:", error);      
        })
      // close the dialog after submission
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Provide Meeting Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Meeting Link</DialogTitle>
          <DialogDescription>
            Please enter the meeting link for this session.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="meeting-link" className="text-sm font-medium">
            Meeting Link
          </Label>
          <Input
            id="meeting-link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://example.com/meeting"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetingLinkDialog;

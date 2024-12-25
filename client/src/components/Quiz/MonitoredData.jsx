import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

const MonitoredData = ({screenshots}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
          size="sm"
          variant="outline">Monitored Data</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Monitored Screenshots</DialogTitle>
            <DialogDescription>
                Screenshots taken during the quiz.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {
              screenshots?.map((screenshot, index) => {
                return <img src={screenshot} key={index} className="w-1/2" alt="screenshot" />
              })
            }
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};

export default MonitoredData;
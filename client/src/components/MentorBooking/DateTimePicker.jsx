import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMinutes, parse } from "date-fns";

const DateTimePicker = ({ onSubmit }) => {
  const [tempDate, setTempDate] = useState("");
  const [tempTime, setTempTime] = useState("");
  const [duration, setDuration] = useState(60); // Default: 1 Hour
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (tempDate && tempTime) {
      const startDateTime = parse(tempTime, "HH:mm", new Date());
      const hours = startDateTime.getHours();

      // Check if the selected time is within 11 AM - 7 PM
      if (hours < 11 || hours >= 19) {
        setError("Please select a time between 11:00 AM and 7:00 PM.");
        return;
      }

      const endDateTime = addMinutes(startDateTime, duration);
      setError(""); // Clear error if valid
      onSubmit(tempDate, tempTime, endDateTime.toTimeString().slice(0, 5));
    }
  };

  return (
    <Card className="p-4 w-full max-w-sm shadow-lg border rounded-lg">
      <CardContent className="space-y-4">
        {/* Date Input */}
        <div>
          <Label className="text-sm font-medium">Select Date</Label>
          <Input
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            className="w-full mt-1"
          />
        </div>

        {/* Time Input */}
        <div>
          <Label className="text-sm font-medium">Select Start Time</Label>
          <Input
            type="time"
            value={tempTime}
            onChange={(e) => setTempTime(e.target.value)}
            className="w-full mt-1"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Meeting Duration Selection */}
        <div>
          <Label className="text-sm font-medium">Meeting Duration</Label>
          <Select onValueChange={(value) => setDuration(parseInt(value))} defaultValue="60">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">1 Hour Meeting</SelectItem>
              <SelectItem value="30">30 Min Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full mt-2">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default DateTimePicker;

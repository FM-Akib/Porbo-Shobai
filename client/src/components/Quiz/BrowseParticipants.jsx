import React from 'react';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import MonitoredData from './MonitoredData';

const BrowseAttempts = ({ opportunity }) => {
  const [filter, setFilter] = React.useState('');

  // Ensure task and attempts exist
  const attempts = opportunity?.task?.attempts || [];
  const questions = opportunity?.task?.questions || [];

  // Filtered data based on input
  const filteredAttempts = attempts.filter(attempt =>
    attempt?.email?.toLowerCase()?.includes(filter?.toLowerCase()),
  );

  // Calculate total points
  const calculateTotalPoints = attempt => {
    let totalPoints = 0;
    questions.forEach((question, index) => {
      if (
        question.type === 'multiple' &&
        parseInt(attempt.answers[index]) === question.correctAnswer
      ) {
        totalPoints += question.points;
      }
    });
    return totalPoints;
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name or email..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name & Organization</TableHead>
              <TableHead>Email & Mobile</TableHead>
              <TableHead>Total Points</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttempts.length ? (
              filteredAttempts.map((attempt, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p>
                        {attempt.firstName} {attempt.lastName}
                      </p>
                      <p className="text-muted-foreground">
                        {attempt.organization}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{attempt.email}</p>
                      <p className="text-muted-foreground">{attempt.mobile}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{calculateTotalPoints(attempt)}</p>
                  </TableCell>
                  <TableCell>
                    <MonitoredData screenshots={attempt.screenshots} />
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        console.log("Monitored Data for", attempt)
                      }
                    >
                      View Monitored Data
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No attempts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BrowseAttempts;

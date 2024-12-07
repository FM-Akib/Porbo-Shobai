import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export function TeamPreview({ teamMembers }) {
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Team Members</h3>
      <div className="grid gap-4">
        {teamMembers.map((member, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <UserCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{member.firstName} {member.lastName}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
                <p className="text-sm text-gray-500">{member.mobile}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
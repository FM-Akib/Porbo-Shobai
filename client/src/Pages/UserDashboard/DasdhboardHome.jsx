import { Card } from "@/components/ui/card";

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold  mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Profile Completion</h2>
          <p className="">Your profile is 80% complete. Add more details to increase visibility.</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
          <p className="">You have 2 mentor sessions scheduled this week.</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
          <p className="">You&apos;re 60% through your current course. Keep it up!</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;


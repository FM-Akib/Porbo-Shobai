import BookingCard from "@/components/DashboardMentor/BookingCard";
import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MentorPayments = () => {
  return (
    <div className="p-4">
      <MentorDashboardTitle title="Mentor Payments" />
      <hr className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BookingCard number="100" title="Payment Received" textColor="green" />
        <BookingCard number="70" title="Payment Pending" textColor="yellow" />
      </div>

      <hr className="my-8" />

      <Tabs defaultValue="received" className="w-full ">
        {/* Tabs Header */}
        <TabsList className="flex justify-start gap-4 bg-white  h-12 rounded-lg">
          <div className="bg-black p-2  text-white rounded-lg">
            <TabsTrigger value="received">Payment Received</TabsTrigger>
            <TabsTrigger value="pending">Payment Pending</TabsTrigger>
          </div>
        </TabsList>

        {/* Payment Received Tab Content */}
        <TabsContent value="received">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Payments Received</h3>
            <p className="text-gray-600">
              List of successfully received payments.
            </p>
          </div>
        </TabsContent>

        {/* Payment Pending Tab Content */}
        <TabsContent value="pending">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Payments Pending</h3>
            <p className="text-gray-600">
              List of pending payments awaiting confirmation.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorPayments;

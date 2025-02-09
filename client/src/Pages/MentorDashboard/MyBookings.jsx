import BookingCard from "@/components/DashboardMentor/BookingCard";
import { FlipText } from "@/components/magicui/flip-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
const MyBookings = () => {
  return (
    <div className="p-4">
      <div className="inline-block">
        <FlipText
          className="text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
          word="My Bookings"
        />
      </div>
      <hr className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BookingCard number="100" title="Total Bookings" textColor="green" />
        <BookingCard number="70" title="Upcoming Sessions" textColor="yellow" />
        <BookingCard number="3" title="Pending Payments" textColor="red" />
      </div>

      <hr className="my-8" />

      <Tabs defaultValue="tab1" className="w-full   ">
      
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
        <TabsList className="flex gap-2 bg-black text-white">
          <TabsTrigger value="tab1">1:1 Sessions</TabsTrigger>
          <TabsTrigger value="tab2">Queries</TabsTrigger>
          <TabsTrigger value="tab3">Resources</TabsTrigger>
        </TabsList>

        
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-1" />
          Filter
        </Button>
      </div>

      {/* Tab Contents */}
      <TabsContent value="tab1">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">1:1 Sessions</h3>
          <p className="text-gray-600">This is 1:1 Sessions content.</p>
        </div>
      </TabsContent>

      <TabsContent value="tab2">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Queries</h3>
          <p className="text-gray-600">This is Queries content.</p>
        </div>
      </TabsContent>

      <TabsContent value="tab3">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Resources</h3>
          <p className="text-gray-600">Resources</p>
        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default MyBookings;

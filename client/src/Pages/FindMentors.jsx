import MentorRequestCard from "@/components/DashboardAdmin/MentorRequestCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import SparklesText from "@/components/ui/sparkles-text";

const FindMentors = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch mentors with filters applied
  const { data: mentors = [], isLoading, refetch } = useQuery({
    queryKey: ["mentors", searchTerm, domainFilter, sortOrder], // Key updates when filters change
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (domainFilter) params.append("domain", domainFilter);
      if (sortOrder) params.append("sort", sortOrder);

      const { data } = await axiosSecure.get(`/verified-mentors?${params.toString()}`);
      return data;
    },
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setDomainFilter("");
    setSortOrder("");
    refetch(); // Re-fetch data without filters
  };

  

  return (
    <div className="p-4 space-y-4 min-h-screen">
        <div className="my-5 md:my-10 flex items-center justify-center">
        <SparklesText text={"Mentors"} 
        className={`text-5xl font-semibold text-gray-700 dark:text-white`}
        />
        </div>
      {/* Search, Filter, Sort, Reset UI */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Search Input */}
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search mentors..."
          className="w-full md:w-1/3"
        />

        {/* Filter by Domain */}
        <Select onValueChange={setDomainFilter} value={domainFilter}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Math">Math</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="ICT">ICT</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort by Rating */}
        <Select onValueChange={setSortOrder} value={sortOrder}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Sort by Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Lowest to Highest</SelectItem>
            <SelectItem value="desc">Highest to Lowest</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button onClick={resetFilters} variant="outline" className="w-full md:w-auto">
          Reset
        </Button>
      </div>

      {
        isLoading && <p className="text-center">Loading mentors...</p>
      }

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 gap-4">
        {mentors.map((mentor) => (
          <MentorRequestCard key={mentor._id} mentor={mentor} path={"/view-mentor-profile"} />
        ))}
      </div>
    </div>
  );
};

export default FindMentors;

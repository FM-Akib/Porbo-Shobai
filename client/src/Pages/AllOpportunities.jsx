import  { useState } from "react";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import OpportunityCard from "@/components/AllOpportunities/OpportunityCard";
import useOpportunities from "@/Hooks/useOpportunities";
import WordRotate from "@/components/ui/word-rotate";
import NotFoundCompetition from "@/components/shared/NotFoundCompetition";

const AllOpportunities = () => {
  const [filters, setFilters] = useState({
    category: "",
    opportunityType: "",
    status: "",
    eligibility: ""
  });
  const [page, setPage] = useState(1);
  const {loader, opportunities, totalPages } = useOpportunities(filters, page, 9);
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (direction) => {
    setPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      opportunityType: "",
      status: "",
      eligibility: ""
    });
    setPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 ">
      <WordRotate
      className="text-xl md:text-3xl mb-8 text-center font-bold text-black dark:text-white"
      words={["Dive into innovation, find competitions.","Participate, Innovate, and Achieve!", "Challenge yourself, discover opportunities.", "Where passion meets purpose!"]}
    />
      
      {/* Filters */}
      { opportunities.length>0 &&  <div className="space-y-4 mb-8  md:sticky md:top-16 bg-white/95 backdrop-blur-md dark:bg-[#020817] md:z-50 md:p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filters.opportunityType} onValueChange={(value) => handleFilterChange("opportunityType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Types</SelectItem>
              <SelectItem value="Hackathons">Hackathons</SelectItem>
              <SelectItem value="General & Case Competitions">General & Case Competitions</SelectItem>
              <SelectItem value="Webinars & Workshops">Webinars & Workshops</SelectItem>
              <SelectItem value="Quizzes">Quizzes</SelectItem>
              <SelectItem value="Innovation Challenges">Innovation Challenges</SelectItem>
              <SelectItem value="Scholarships">Scholarships</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Status</SelectItem>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.eligibility} onValueChange={(value) => handleFilterChange("eligibility", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Eligibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Eligibility</SelectItem>
              <SelectItem value="Open to all">Open to all</SelectItem>
              <SelectItem value="Students only">Students only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
            {Object.entries(filters).map(
            ([key, value]) =>
            value && (
                <Badge key={key} variant="secondary">
                {key}: {value || "All"}
                <button
                    onClick={() => handleFilterChange(key, "")}
                    className="ml-1 rounded-full hover:bg-muted"
                    aria-label={`Remove ${key} filter`}
                >
                    ×
                </button>
                </Badge>
            )
           )}

            {Object.values(filters).some(value => value !== "") && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                    </Button>
                )}
        </div>
      </div>
      }
      
      {/* Opportunities */}
      {!loader && opportunities?.length === 0 &&  <NotFoundCompetition clearFilters={clearFilters} />}
      {loader && <Loader /> }
      {opportunities?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity._id} opportunity={opportunity} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {opportunities && opportunities.length > 0 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange("prev")}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange("next")}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
};

export default AllOpportunities;


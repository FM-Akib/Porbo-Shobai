import OpportunityCard from "@/components/AllOpportunities/OpportunityCard";
import Loader from "@/components/shared/Loader";
import useOpportunities from "@/Hooks/useOpportunities";
import { useState } from "react";

const AllOpportunities = () => {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const { opportunities, totalPages } = useOpportunities(filters, page, 10);
    // console.log(opportunities);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPage(1); // Reset to first page when filters change
      };
    
      const handlePageChange = (direction) => {
        setPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
      };
    return (
        <section className="max-w-7xl mx-auto">
            
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            name="category"
            placeholder="Search by category"
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <select name="opportunityType" onChange={handleFilterChange} className="border p-2 rounded">
            <option value="">All Types</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Competitions">Competitions</option>
          </select>
          <select name="status" onChange={handleFilterChange} className="border p-2 rounded">
            <option value="">All Status</option>
            <option value="Live">Live</option>
            <option value="Closed">Closed</option>
          </select>
          <select name="eligibility" onChange={handleFilterChange} className="border p-2 rounded">
            <option value="">All Eligibility</option>
            <option value="Open to all">Open to all</option>
            <option value="Students only">Students only</option>
          </select>
        </div>
  
        {/* Opportunities */}
        {opportunities?.length === 0 && <Loader /> }
        {!opportunities && <p>No opportunities found</p>}
        {opportunities?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities?.map((opportunity) => (
              <OpportunityCard key={opportunity._id} opportunity={opportunity} />
            ))}
          </div>
        )}
  
        {/* Pagination */}
        <div className={`${opportunities.length===0? 'hidden':'block'} flex justify-center items-center mt-12 `}>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange("prev")}
            className="px-4 py-2 bg-gray-300 rounded mr-2 shadow-md"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange("next")}
            className="px-4 py-2 bg-gray-300 rounded ml-2 shadow-md"
          >
            Next
          </button>
        </div>
      </section>
    );
};

export default AllOpportunities;
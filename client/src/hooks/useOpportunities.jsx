import { useEffect, useState } from "react";

const useOpportunities = (filters = {}, page = 1, limit = 10) => {
    const [opportunities, setOpportunities] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
      const fetchOpportunities = async () => {
        try {
          const queryParams = new URLSearchParams({
            ...filters,
            page,
            limit,
          }).toString();
  
          const response = await fetch(`${import.meta.env.VITE_server_url}/opportunities?${queryParams}`);
          const data = await response.json();
  
          setOpportunities(data.opportunities);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Failed to fetch opportunities:", error);
        }
      };
  
      fetchOpportunities();
    }, [filters, page, limit]);
  
    return { opportunities, totalPages };
  };
  
  export default useOpportunities;
  
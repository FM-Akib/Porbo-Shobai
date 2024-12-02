import OpportunityCard from "@/components/AllOpportunities/OpportunityCard";
import Loader from "@/components/shared/Loader";
import useOpportunities from "@/Hooks/useOpportunities";

const AllOpportunities = () => {
    const [opportunities] = useOpportunities();
    console.log(opportunities);
    return (
        <section className="max-w-7xl mx-auto">
        {
            opportunities.length === 0 && (<Loader/>)
        }
        {
            opportunities?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {opportunities.map(opportunity=>(
                        <OpportunityCard key={opportunity._id} opportunity={opportunity}/>
                    ))}
                </div>
            )
        }
        </section>
    );
};

export default AllOpportunities;
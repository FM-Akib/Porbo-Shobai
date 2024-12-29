import OpportunitiesTable from "@/components/DashboardCompany/OpportunitiesTable";
import TitleDashboard from "@/components/DashboardUser/TitleDashboard";
import Loader from "@/components/shared/Loader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/Hooks/use-toast";
import useUserInfo from "@/Hooks/useUserInfo";
import { useDeleteOpportunityMutation, useGetOpportunitiesByIdsQuery } from "@/redux/api/api";

const MyHosts = () => {
    const { userInfo, isLoading: loadUserInfo } = useUserInfo();
    const {
        data: myhosts = [],
        isLoading,
        isError,
    } = useGetOpportunitiesByIdsQuery(userInfo?.hosts?.join(','), {
        skip: !userInfo?.hosts || userInfo?.hosts.length === 0, // Skip if no hosts
    });
    const [deleteOpportunity, { isLoading:deleteLoading }] = useDeleteOpportunityMutation();

    const handleDelete = async (id) => {
        try {
            // Make the API call to delete the opportunity
            await deleteOpportunity(id).unwrap(); 
            // Show success toast notification
            toast({
              variant: "default",
              title: "Opportunity!",
              description: "Opportunity deleted successfully.",
              action: <ToastAction altText="ok">OK!</ToastAction>,
              className: "bg-green-500 text-white",
            })
          } catch {
            toast({
              variant: "destructive",
              title: "Error!",
              description: "Failed to delete opportunity.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
              className: "bg-red-500 text-white",
            })      
          }
    };
    if (deleteLoading) return <Loader />;
    if (isLoading || loadUserInfo) return <Loader />;
    if (isError) return <div className="text-center text-red-500 font-bold text-xl mt-8">
        Something went wrong. Please try again later.</div>;
    
    return (
        <section className="p-3 md:p-6">
            <TitleDashboard title="My Hosts" />
            <div className="md:px-10">
                <OpportunitiesTable 
                    opportunities={myhosts}
                    onDelete={handleDelete}
                />
            </div>
        </section>
    );
};

export default MyHosts;
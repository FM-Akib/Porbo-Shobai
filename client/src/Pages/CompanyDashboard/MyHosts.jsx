import OpportunitiesTable from "@/components/DashboardCompany/OpportunitiesTable";
import TitleDashboard from "@/components/DashboardUser/TitleDashboard";
import Loader from "@/components/shared/Loader";
import useUserInfo from "@/Hooks/useUserInfo";
import { useGetOpportunitiesByIdsQuery } from "@/redux/api/api";

const MyHosts = () => {
    const { userInfo, isLoading: loadUserInfo } = useUserInfo();
    const {
        data: myhosts = [],
        isLoading,
        isError,
    } = useGetOpportunitiesByIdsQuery(userInfo?.hosts?.join(','), {
        skip: !userInfo?.hosts || userInfo?.hosts.length === 0, // Skip if no hosts
    });

    const handleDelete =  (id) => {
        console.log("Delete opportunity with ID:", id);
        // try {
        //     await axiosSecure.delete(`/opportunities/${id}`);
        //     setMyhosts(prev => prev.filter(host => host._id !== id));
        // } catch (error) {
        //     console.error("Error deleting opportunity:", error.message);
        // }
    };
    
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
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useUserInfo from "@/Hooks/useUserInfo";
import { useEffect, useState } from "react";
import qs from 'qs';
import TitleDashboard from "@/components/DashboardUser/TitleDashboard";
import Loader from "@/components/shared/Loader";
import OpportunitiesTable from "@/components/DashboardCompany/OpportunitiesTable";

const MyHosts = () => {
    const { userInfo, isLoading } = useUserInfo();
    const [myhosts, setMyhosts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        async function fetchData() {
            if (!userInfo.hosts || userInfo.hosts.length === 0) return;
    
            try {
                const query = qs.stringify({ opportunityIds: userInfo.hosts }, 
                    { arrayFormat: "comma" });
                const result = await axiosSecure.get(`/opportunitiesbyids?${query}`);
                setMyhosts(result.data);
            } catch (error) {
                console.error("Error fetching opportunities:", error.message);
            }
        }
        fetchData();
    }, [userInfo?.hosts, axiosSecure]);

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/opportunities/${id}`);
            setMyhosts(prev => prev.filter(host => host._id !== id));
        } catch (error) {
            console.error("Error deleting opportunity:", error.message);
        }
    };
    
    if (isLoading) return <Loader />;
    
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
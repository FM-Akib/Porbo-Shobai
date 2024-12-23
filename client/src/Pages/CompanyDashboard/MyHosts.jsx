import MyRegistrationCard from "@/components/DashboardUser/MyRegistrationCard";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useUserInfo from "@/Hooks/useUserInfo";
import {  useEffect } from "react";
import { useState } from "react";
import qs from 'qs'; 
import TitleDashboard from "@/components/DashboardUser/TitleDashboard";

const MyHosts = () => {
    const {userInfo} = useUserInfo();
    const [myhosts, setMyhosts] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(userInfo.hosts)
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
    
    
    
    
    return (
        <section className="p-3 md:p-6">
        
        <TitleDashboard title="My Hosts" />
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-10">
        {
            myhosts?.map(participation => (
                <MyRegistrationCard key={participation.id} Aopportunity={participation}/>
            ))
        }
        </div>

       

            
        </section>
    );
};

export default MyHosts;
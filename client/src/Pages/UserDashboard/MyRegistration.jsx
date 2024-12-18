// import MyRegistrationCard from "@/components/DashboardUser/MyRegistrationCard";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useUserInfo from "@/Hooks/useUserInfo";
import {  useEffect } from "react";
import { useState } from "react";
import qs from 'qs'; 

const MyRegistration = () => {
    const {userInfo} = useUserInfo();
    const [participations, setParticipations] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(userInfo.participations)
    useEffect(() => {
        async function fetchData() {
            if (!userInfo.participations || userInfo.participations.length === 0) return;
    
            try {
                const query = qs.stringify({ opportunityIds: userInfo.participations }, 
                    { arrayFormat: "comma" });
                const result = await axiosSecure.get(`/opportunitiesbyids?${query}`);
                setParticipations(result.data);
            } catch (error) {
                console.error("Error fetching opportunities:", error.message);
            }
        }
        fetchData();
    }, [userInfo?.participations, axiosSecure]);
    
    
    console.log(participations)
    
    return (
        <section className="p-3 md:p-6">

        {/* <MyRegistrationCard/> */}

            
        </section>
    );
};

export default MyRegistration;
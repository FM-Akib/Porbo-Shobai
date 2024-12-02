import { useEffect, useState } from "react";


const useOpportunities = () => {
    const [opportunities, setOpportunities] = useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_server_url}/opportunities`)
        .then(response => response.json())
        .then(data=>setOpportunities(data));
    },[])
    return [opportunities];
};

export default useOpportunities;

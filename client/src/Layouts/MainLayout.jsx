import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <main className="">
        <Outlet/> 
        </main>
        </>
    );
};

export default MainLayout;
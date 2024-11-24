import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <main className="max-w-7xl mx-auto py-4">
        <Outlet/> 
        </main>
        </>
    );
};

export default MainLayout;
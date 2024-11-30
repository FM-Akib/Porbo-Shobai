import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <Toaster />
        <main className="">
        <Outlet/> 
        </main>
        </>
    );
};

export default MainLayout;
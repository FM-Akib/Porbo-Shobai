import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <main className="">
        <Outlet/> 
        </main>
        <Toaster />
        </>
    );
};

export default MainLayout;
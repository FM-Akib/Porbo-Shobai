import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

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
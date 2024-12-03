import { SidebarNav } from "@/components/DashboardUser/SidebarNav";
import { Outlet } from "react-router-dom";

const UserDashLayout = () => {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <h2 className="font-semibold">Dashboard</h2>
            </div>
            <SidebarNav />
          </div>
        </div>
        <div className="flex flex-col">
          <Outlet />
        </div>
      </div>
    );
};

export default UserDashLayout;
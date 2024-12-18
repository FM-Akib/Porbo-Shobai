import Sidebar from '@/components/DashboardUser/SidebarNav';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

const UserDashLayout = () => {
  return (
    <>
     <Toaster/>
    <div className="md:grid grid-cols-12 h-screen ">
      <div className="col-span-2">
      <Sidebar />
      </div>
      <div className="mt-12 md:mt-0 col-span-10 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto  dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
};

export default UserDashLayout;


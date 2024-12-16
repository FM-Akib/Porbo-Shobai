import Sidebar from '@/components/DashboardUser/SidebarNav';
import { Outlet } from 'react-router-dom';

const UserDashLayout = () => {
  return (
    <div className="md:grid grid-cols-12 h-screen ">
      <div className="col-span-2">
      <Sidebar />
      </div>
      <div className="mt-12 md:mt-0 col-span-10 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashLayout;


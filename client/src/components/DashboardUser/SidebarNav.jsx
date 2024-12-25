import useUserInfo from '@/Hooks/useUserInfo';
import { Award, BookOpen, Clock, Gift, Home, House, LayoutDashboard, LogOut, PanelRightClose, ScreenShare, ScrollText, Settings, Star, UserCircle, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const routes = [
  { label: "Profile", icon: UserCircle, href: "/dashboard/profile" },
  { label: "Registration", icon: Users, href: "/dashboard/my-registration" },
  { label: "Referrals", icon: Star, href: "/dashboard/referrals" },
  { label: "My Rounds", icon: Clock, href: "/dashboard/rounds" },
  { label: "Watchlist", icon: Home, href: "/dashboard/watchlist" },
  { label: "Mentor Sessions", icon: Users, href: "/dashboard/mentor" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Certificates", icon: Award, href: "/dashboard/certificates" },
  { label: "Rewards", icon: Gift, href: "/dashboard/rewards" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];
const routesCompany = [
  { label: "Profile", icon: UserCircle, href: "/dashboard/company-profile" },
  { label: "Hosts", icon: ScreenShare, href: "/dashboard/my-hosts" },
  { label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { label: "Certificates", icon: Award, href: "/dashboard/certificates" },
  { label: "Rewards", icon: Gift, href: "/dashboard/rewards" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const generalRoutes = [
  { label: "Home", icon: House , href: "/" },
  { label: "Opportunities", icon: ScrollText , href: "/all-opportunities" },
  { label: "Host Opportunity", icon: ScreenShare  , href: "/create-competition" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {userInfo} = useUserInfo();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-20 md:hidden">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Your Logo</div>
        
        <button
          className="lg:hidden p-2 bg-gray-600 rounded-md"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <PanelRightClose size={24} />}
        </button>
      </div>
    </nav>

      {/* <button
        className="fixed p-2 bg-gray-700 text-white rounded-md top-5 left-5 lg:hidden z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <PanelRightClose size={24} />}
      </button> */}

      <aside className={`
        mt-16 md:mt-0
        fixed inset-y-0 left-0 bg-white dark:bg-gray-900 md:bg-transparent shadow-md max-h-screen md:w-64
        transition-transform duration-300 ease-in-out z-10
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="md:flex items-center justify-center h-14 border-b hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-700 dark:text-white flex items-center justify-center gap-2">
              <LayoutDashboard />Dashboard</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex-1 px-2 space-y-1">
              {(userInfo?.role === "student" ? routes : routesCompany)?.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${location.pathname === route.href
                      ? 'bg-yellow-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:bg-yellow-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'}
                  `}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </Link>
              ))}

              <hr className='pt-5' />
              {generalRoutes?.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${location.pathname === route.href
                      ? 'bg-yellow-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:bg-yellow-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'}
                  `}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
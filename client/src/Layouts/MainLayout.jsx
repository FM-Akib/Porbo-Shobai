import ChatAssistant from '@/components/shared/ChatAssist';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <main className="">
        <div className="">
          <Outlet />
        </div>
        <Footer />
        <ChatAssistant />
      </main>
    </>
  );
};

export default MainLayout;

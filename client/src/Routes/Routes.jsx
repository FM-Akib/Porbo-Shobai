import AQuiz from '@/components/Quiz/AQuiz';
import UpdateAopportunityForm2 from '@/components/UpdateAopportunity.jsx/UpdateAopportunityForm2';
import MainLayout from '@/Layouts/MainLayout';
import UserDashLayout from '@/Layouts/UserDashLayout';
import MentorCandidateProfile from '@/Pages/AdminDashboard/MentorCandidateProfile';
import MentorRequests from '@/Pages/AdminDashboard/MentorRequests';
import AllOpportunities from '@/Pages/AllOpportunities';
import Aopportunity from '@/Pages/Aopportunity';
import AddQuiz from '@/Pages/CompanyDashboard/AddQuiz';
import CompanyDashboard from '@/Pages/CompanyDashboard/CompanyDashboard';
import MyHosts from '@/Pages/CompanyDashboard/MyHosts';
import UpdateAnOpportunity from '@/Pages/CompanyDashboard/UpdateAnOpportunity';
import Competitions from '@/Pages/Competitions';
import ErrorPage from '@/Pages/Error404';
import GlobalLeaderboard from '@/Pages/GlobalLeaderBoard';
import HostCompetitions from '@/Pages/HostCompetitions';
import HostComForm from '@/Pages/HostForm';
import HostForm2 from '@/Pages/HostForm2';
import Landing from '@/Pages/Landing';
import Login from '@/Pages/Login';
import MentorPayments from '@/Pages/MentorDashboard/MentorPayments';
import MentorReviews from '@/Pages/MentorDashboard/MentorReviews';
import MyBookings from '@/Pages/MentorDashboard/MyBookings';
import MentorForm from '@/Pages/MentorForm';
import MentorForm2 from '@/Pages/MentorForm2';
import OpportunityRegistration from '@/Pages/OpportunityRegistration';
import Register from '@/Pages/Register';
import DashboardHome from '@/Pages/UserDashboard/DasdhboardHome';
import DashboardUser from '@/Pages/UserDashboard/DashboardUser';
import MyRegistration from '@/Pages/UserDashboard/MyRegistration';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/competitions',
        element: <Competitions />,
      },
      {
        path: '/host-competitions',
        element: <HostCompetitions />,
      },
      {
        path: '/create-competition',
        element: <HostComForm />,
      },
      {
        path: '/complete-competition',
        element: <HostForm2 />,
      },
      {
        path: '/all-opportunities',
        element: <AllOpportunities />,
      },
      {
        path: '/a-opportunity/:id',
        element: <Aopportunity />,
      },
      {
        path: '/opportunity-registration/:id',
        element: <OpportunityRegistration />,
      },
      {
        path: '/create-mentor',
        element: <MentorForm />,
      },
      {
        path: '/complete-mentor',
        element: <MentorForm2 />,
      },
      {
        path: '/quiz/psq',
        element: <AQuiz />,
      },
      {
        path: '/leaderboard',
        element: <GlobalLeaderboard />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <UserDashLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'profile',
        element: <DashboardUser />,
      },
      {
        path: 'my-registration',
        element: <MyRegistration />,
      },
      {
        path: 'company-profile',
        element: <CompanyDashboard />,
      },
      {
        path: 'my-hosts',
        element: <MyHosts />,
      },
      {
        path: 'add-quiz/:id',
        element: <AddQuiz />,
      },
      {
        path: 'update-a-opportunity/:id',
        element: <UpdateAnOpportunity />,
      },
      {
        path: 'update-a-opportuinity-final/:id',
        element: <UpdateAopportunityForm2 />,
      },
      {
        path: '/dashboard/bookings',
        element: <MyBookings/>,
      },
      {
        path: '/dashboard/payments',
        element: <MentorPayments/>
      },
      {
        path: '/dashboard/reviews',
        element: <MentorReviews/>
      },
      {
        path: '/dashboard/mentor-requests',
        element: <MentorRequests/>
      },
      {
        path: 'mentor-candidate-profile/:id',
        element: <MentorCandidateProfile/>
      }
    ],
  },
]);

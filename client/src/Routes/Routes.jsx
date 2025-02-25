import AQuiz from '@/components/Quiz/AQuiz';
import UpdateAopportunityForm2 from '@/components/UpdateAopportunity.jsx/UpdateAopportunityForm2';
import MainLayout from '@/Layouts/MainLayout';
import UserDashLayout from '@/Layouts/UserDashLayout';
import About from '@/Pages/About';
import MentorCandidateProfile from '@/Pages/AdminDashboard/MentorCandidateProfile';
import MentorRequests from '@/Pages/AdminDashboard/MentorRequests';
import AllOpportunities from '@/Pages/AllOpportunities';
import Aopportunity from '@/Pages/Aopportunity';
import Chat from '@/Pages/Chat';
import AddQuiz from '@/Pages/CompanyDashboard/AddQuiz';
import CompanyDashboard from '@/Pages/CompanyDashboard/CompanyDashboard';
import MyHosts from '@/Pages/CompanyDashboard/MyHosts';
import UpdateAnOpportunity from '@/Pages/CompanyDashboard/UpdateAnOpportunity';
import Competitions from '@/Pages/Competitions';
import ErrorPage from '@/Pages/Error404';
import FindMentors from '@/Pages/FindMentors';
import GlobalLeaderboard from '@/Pages/GlobalLeaderBoard';
import HostCompetitions from '@/Pages/HostCompetitions';
import HostComForm from '@/Pages/HostForm';
import HostForm2 from '@/Pages/HostForm2';
import Landing from '@/Pages/Landing';
import Login from '@/Pages/Login';
import MentorAvailability from '@/Pages/MentorDashboard/MentorAvailability';
import MentorPayments from '@/Pages/MentorDashboard/MentorPayments';
import MentorReviews from '@/Pages/MentorDashboard/MentorReviews';
import MyBookings from '@/Pages/MentorDashboard/MyBookings';
import MentorForm from '@/Pages/MentorForm';
import MentorForm2 from '@/Pages/MentorForm2';
import Mentors from '@/Pages/Mentors';
import OpportunityRegistration from '@/Pages/OpportunityRegistration';
import Register from '@/Pages/Register';
import Rewards from '@/Pages/Rewards';
import DashboardHome from '@/Pages/UserDashboard/DasdhboardHome';
import DashboardUser from '@/Pages/UserDashboard/DashboardUser';
import MyRegistration from '@/Pages/UserDashboard/MyRegistration';
import ViewMentor from '@/Pages/ViewMentor';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

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
        element: (
          <PrivateRoute>
            {' '}
            <HostComForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/complete-competition',
        element: (
          <PrivateRoute>
            <HostForm2 />
          </PrivateRoute>
        ),
      },
      {
        path: '/all-opportunities',
        element: <AllOpportunities />,
      },
      {
        path: '/a-opportunity/:id',
        element: (
          <PrivateRoute>
            <Aopportunity />
          </PrivateRoute>
        ),
      },
      {
        path: '/opportunity-registration/:id',
        element: (
          <PrivateRoute>
            <OpportunityRegistration />
          </PrivateRoute>
        ),
      },
      {
        path: '/mentors',
        element: <Mentors />,
      },
      {
        path: '/create-mentor',
        element: (
          <PrivateRoute>
            <MentorForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/complete-mentor',
        element: (
          <PrivateRoute>
            <MentorForm2 />
          </PrivateRoute>
        ),
      },
      {
        path: '/find-mentor',
        element: <FindMentors />,
      },
      {
        path: '/quiz/psq',
        element: (
          <PrivateRoute>
            {' '}
            <AQuiz />
          </PrivateRoute>
        ),
      },
      {
        path: '/leaderboard',
        element: <GlobalLeaderboard />,
      },
      {
        path: '/view-mentor-profile/:id',
        element: (
          <PrivateRoute>
            <ViewMentor />
          </PrivateRoute>
        ),
      },
      {
        path: '/chat',
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/rewards',
        element: <Rewards />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <UserDashLayout />
      </PrivateRoute>
    ),
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
        path: 'bookings',
        element: <MyBookings />,
      },
      {
        path: 'payments',
        element: <MentorPayments />,
      },
      {
        path: 'reviews',
        element: <MentorReviews />,
      },
      {
        path: 'mentor-requests',
        element: <MentorRequests />,
      },
      {
        path: 'mentor-candidate-profile/:id',
        element: <MentorCandidateProfile />,
      },
      {
        path: 'availability',
        element: <MentorAvailability />,
      },
    ],
  },
]);


import MainLayout from "@/Layouts/MainLayout";
import Competitions from "@/Pages/Competitions";
import ErrorPage from "@/Pages/Error404";
import HostComForm from "@/Pages/HostForm";
import HostCompetitions from "@/Pages/HostCompetitions";
import Landing from "@/Pages/Landing";
import Register from "@/Pages/Register/Register";
import Login from "@/Pages/Login/Login";
import {createBrowserRouter} from "react-router-dom";
import HostForm2 from "@/Pages/HostForm2";
import AllOpportunities from "@/Pages/AllOpportunities";
import Aopportunity from "@/Pages/Aopportunity";
import DashboardUser from "@/Pages/DashboardUser";
import UserDashLayout from "@/Layouts/UserDashLayout";
import OpportunityRegistration from "@/Pages/OpportunityRegistration";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Landing/>
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/competitions",
          element: <Competitions/>
        },
        {
          path: "/host-competitions",
          element: <HostCompetitions/>
        },
        {
          path: "/create-competition",
          element: <HostComForm/>
        },
        {
          path: "/complete-competition",
          element: <HostForm2/>
        },
        {
          path: "/all-opportunities",
          element: <AllOpportunities/>
        },
        {
          path: "/a-opportunity/:id",
          element: <Aopportunity/>
        },
        {
          path: "/opportunity-registration/:id",
          element: <OpportunityRegistration/>
        }
      ]
    },
    {
      path: "dashboard",
      element: <UserDashLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "home",
          element: <DashboardUser/>
        }
      ]
    }
  ]);
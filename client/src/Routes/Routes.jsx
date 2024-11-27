
import MainLayout from "@/Layouts/MainLayout";
import Competitions from "@/Pages/Competitions";
import ErrorPage from "@/Pages/Error404";
import HostComForm from "@/Pages/HostComForm";
import HostCompetitions from "@/Pages/HostCompetitions";
import Landing from "@/Pages/Landing";
import Register from "@/Pages/Register/Register";
import Login from "@/Pages/Login/Login";
import {createBrowserRouter} from "react-router-dom";


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
        }
      ]
    },
  ]);
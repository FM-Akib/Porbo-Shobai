
import MainLayout from "@/Layouts/MainLayout";
import Landing from "@/Pages/Landing";
import {createBrowserRouter} from "react-router-dom";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <Landing/>
        }
      ]
    },
  ]);
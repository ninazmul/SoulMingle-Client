import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Home/Biodatas";
import AboutUs from "../Pages/Home/AboutUs";
import ContactUs from "../Pages/Home/ContactUs";
import Dashboard from "../Pages/Home/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BioDetails from "../Pages/Home/BioDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/biodata",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "/details/:id",
        element: <BioDetails></BioDetails>,
        // loader: async ({ params }) => {
        //   const { _id } = params;
        //   const response = await fetch(
        //     `http://localhost:5000/bioData/${_id}`
        //   );
        //   const data = await response.json();
        //   return data;
        // },
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
]);
export default router;

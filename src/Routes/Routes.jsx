import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Home/Biodatas";
import AboutUs from "../Pages/Home/AboutUs";
import ContactUs from "../Pages/Home/ContactUs";
import Dashboard from "../Pages/Home/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BioDetails from "../Pages/Home/BioDetails";
import SignIn from "../Pages/SignIn-Up/SignIn";
import SignUp from "../Pages/SignIn-Up/SignUp";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <BioDetails></BioDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <ContactUs></ContactUs>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
export default router;

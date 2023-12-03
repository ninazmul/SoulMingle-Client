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
import FavBio from "../Pages/FavBio";
import EditBio from "../Pages/Home/EditBio";
import ViewBio from "../Pages/Home/ViewBio";
import CheckOut from "../Pages/Home/CheckOut";
import AdminDash from "../Pages/Home/AdminDash";
import ManageUser from "../Pages/Home/ManageUser";
import ApprovedPremium from "../Pages/Home/ApprovedPremium";
import ApprovedContactReq from "../Pages/Home/ApprovedContactReq";
import MyContactReq from "../Pages/Home/MyContactReq";



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
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/editBio",
        element: <EditBio></EditBio>,
      },
      {
        path: "/dashboard/viewBio",
        element: <ViewBio></ViewBio>,
      },
      {
        path: "/dashboard/favBio",
        element: <FavBio></FavBio>,
      },
      {
        path: "/dashboard/checkout/:id",
        element: <CheckOut></CheckOut>,
      },
      {
        path: "/dashboard/myContactReq",
        element: <MyContactReq></MyContactReq>,
      },
      {
        path: "/dashboard/adminDash",
        element: <AdminDash></AdminDash>,
      },
      {
        path: "/dashboard/manageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "/dashboard/approvePm",
        element: <ApprovedPremium></ApprovedPremium>,
      },
      {
        path: "/dashboard/approveCR",
        element: <ApprovedContactReq></ApprovedContactReq>,
      },
    ],
  },
]);
export default router;

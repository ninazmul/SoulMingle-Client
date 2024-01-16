import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Home/Shared/Footer";
import NavBar from "../Pages/Home/Shared/Navbar";

const Root = () => {

  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("signIn") ||
    location.pathname.includes("signUp");
  return (
      <div>
        { noHeaderFooter || <NavBar></NavBar>}
        <div className="min-h-screen">
          <Outlet></Outlet>
        </div>
       { noHeaderFooter || <Footer></Footer>}
      </div>
    );
};

export default Root;
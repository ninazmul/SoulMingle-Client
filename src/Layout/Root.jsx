import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Shared/Footer";
import NavBar from "../Pages/Home/Shared/Navbar";

const Root = () => {
    return (
      <div>
        <NavBar></NavBar>
        <div className="min-h-screen">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default Root;
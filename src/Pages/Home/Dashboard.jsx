
import { Button } from "flowbite-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";
import { RiHeart2Fill } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
import useAxios from "../../Hooks/useAxios";
import Chart from "react-google-charts";


const Dashboard = () => {

    const { user, singOUT } = useContext(AuthContext);
    
  const [isAdmin] = useAdmin();
  
  const [chartData, setChartData] = useState([]);
  const axios = useAxios();
  const location = useLocation();
  const [totalRevenue, setTotalRevenue] = useState(0);

     const handleSignOut = () => {
       singOUT()
         .then(() => {})
         .catch((error) => console.log(error));
       Swal.fire({
         icon: "success",
         title: "Successful!",
         text: "Sign out successfully!",
       });
     };
  
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get("/bioData");
       const data = response.data;

       let totalLength = 0;
       let maleLength = 0;
       let femaleLength = 0;
       let premiumLength = 0;

       data.forEach((item) => {
         totalLength++;
         if (item.BiodataType === "Male") {
           maleLength++;
         } else if (item.BiodataType === "Female") {
           femaleLength++;
         }

         if (item.Subscription === "Premium") {
           premiumLength++;
         }
       });

       const costPerPremiumUser = 500; 
       const totalRevenue = premiumLength * costPerPremiumUser;
       setTotalRevenue(totalRevenue);

       setChartData([
         ["Category", "Value"],
         ["Total", totalLength],
         ["Male", maleLength],
         ["Female", femaleLength],
         ["Premium", premiumLength],
       ]);
     } catch (error) {
       console.error("Error fetching pie chart data:", error);
     }
   };

   fetchData();
 }, [axios]);


   const options = {
     title: "My Pie Chart",
     pieHole: 0.4,
     
   };

    
    return (
      <section className="flex">
        <div>
          <div className="bg-pink-500 h-screen ">
            <ul className="pt-16">
              {isAdmin ? (
                <>
                  {" "}
                  <Link to="/dashboard/adminDash">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <MdViewInAr />
                      Admin Dashboard
                    </li>
                  </Link>
                  <Link to="/dashboard/manageUser">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <FaEdit />
                      Manage Users
                    </li>
                  </Link>
                  <Link to="/dashboard/approvePm">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <MdWorkspacePremium />
                      Approved Premium
                    </li>
                  </Link>
                  <Link to="/dashboard/approveCR">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <MdWorkspacePremium />
                      Approved Contact Request
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/dashboard/viewBio">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <MdViewInAr />
                      View Biodata
                    </li>
                  </Link>
                  <Link to="/dashboard/editBio">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <FaEdit />
                      Edit Biodata
                    </li>
                  </Link>
                  <Link to="/dashboard/favBio">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <RiHeart2Fill />
                      Favourites Biodata
                    </li>
                  </Link>
                  <Link to="/dashboard/myContactReq">
                    <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                      <IoBagCheckOutline />
                      My Contact Request
                    </li>
                  </Link>
                </>
              )}
              <div
                style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}
              ></div>
              <Link to="/">
                <li className="flex items-center gap-2 text-white hover:text-pink-500 hover:bg-white px-4 py-2">
                  <IoHomeSharp />
                  Home
                </li>
              </Link>
              {user ? (
                <>
                  <Link to="/signIn" className="w-full">
                    <Button
                      className="w-full bg-white text-pink-500 rounded-none hover:bg-pink-500 hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signIn">
                    <Button className="w-full bg-white text-pink-500 rounded-none hover:bg-pink-500 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="flex-1 lg:p-10">
          <h1 className="text-center text-2xl md:text-4xl font-bold uppercase">
            Welcome to Dashboard
          </h1>
          {isAdmin ? (
            <>
              <div>
                <h1 className="text-center text-pink-500 text-2xl md:text-4xl font-bold uppercase">
                  Statistics
                </h1>

                {location.pathname === "/dashboard" && (
                  <div>
                    <p className="text-center text-xl md:text-2xl font-bold uppercase">
                      Total Revenue: <span className="text-pink-500">{totalRevenue}</span> BDT
                    </p>
                    <Chart
                      chartType="PieChart"
                      width={"100%"}
                      height={"300px"}
                      data={chartData}
                      options={options}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
          <Outlet></Outlet>
        </div>
      </section>
    );
};

export default Dashboard;
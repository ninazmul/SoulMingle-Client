import { Link } from "react-router-dom";
import { Dropdown, Navbar, Button } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import useFavBio from "../../../Hooks/useFavBio";

const NavBar = () => {
  const { user, singOUT } = useContext(AuthContext);
  const [favBio] = useFavBio();

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

  const navBtn = (
    <>
      <ul className="text-white md:flex gap-4">
        <Link to="/">
          <li className="hover:text-pink-500 focus:text-pink-500">Home</li>
        </Link>
        <Link to="/biodata">
          <li className="hover:text-pink-500 focus:text-pink-500">Biodatas</li>
        </Link>
        <Link to="/about">
          <li className="hover:text-pink-500 focus:text-pink-500">About Us</li>
        </Link>
        <Link to="/contact">
          <li className="hover:text-pink-500 focus:text-pink-500">
            Contact Us
          </li>
        </Link>
      </ul>
    </>
  );
  return (
    <Navbar
      fluid
      rounded
      className="bg-black fixed z-50 bg-opacity-30 w-11/12 ml-4"
    >
      <Navbar.Brand href="/">
        <img
          src="https://i.ibb.co/4dxnZw8/Soul-Mingle-removebg-preview.png"
          className="mr-3 h-6 sm:h-9"
          alt="SoulMingle Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-bold text-white">
          Soul<span className="text-pink-500">Mingle</span>
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-4 items-center">
        <Link to="/dashboard/favBio">
          <button
            type="button"
            className="relative inline-flex items-center text-3xl font-medium text-center text-pink-500"
          >
            <FaHeart />

            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {favBio.length}
            </div>
          </button>
        </Link>

        <Dropdown
          arrowIcon={false}
          inline
          label={
            user ? (
              <img
                src={user.photoURL}
                className="rounded-full h-10 w-10"
                alt="Setting"
              />
            ) : null
          }
        >
          {user && (
            <>
              <Dropdown.Header>
                <span className="block text-sm">{user.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to="/dashboard">
                  <li className="hover:text-pink-500 focus:text-pink-500">
                    Dashboard
                  </li>
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
          <Dropdown.Item>
            {user ? (
              <>
                <Link to="/signIn" className="w-full">
                  <Button
                    outline
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signIn">
                  <Button
                    outline
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{navBtn}</Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

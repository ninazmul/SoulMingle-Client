import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const NavBar = () => {

  const { user, singOUT } = useContext(AuthContext);

  const handleSignOut = () => {
    singOUT()
      .then(() => { })
      .catch(error => console.log(error))
    Swal.fire({
      icon: "success",
      title: "Successful!",
      text: "Sign out successfully!",
    });
  }

    const navBtn = (
      <>
        <ul className="text-white md:flex gap-4">
          <Link to="/">
            <li className="hover:text-pink-500 focus:text-pink-500">
              Home
            </li>
          </Link>
          <Link to="/biodata">
            <li className="hover:text-pink-500 focus:text-pink-500">
              Biodatas
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:text-pink-500 focus:text-pink-500">
              About Us
            </li>
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
            src="/src/assets/SoulMingle-removebg-preview.png"
            className="mr-3 h-6 sm:h-9"
            alt="SoulMingle Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-bold text-white">
            Soul<span className="text-pink-500">Mingle</span>
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<img src={user.photoURL} className="rounded-full w-1/3" alt="User settings"/>}
          >
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
            <Dropdown.Item>
              {user ? (
                <>
                  <Button
                    outline
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <Link to="/signIn">Sign Out</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    outline
                    gradientDuoTone="purpleToPink"
                    className="w-full"
                  >
                    <Link to="/signIn">Sign In</Link>
                  </Button>
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
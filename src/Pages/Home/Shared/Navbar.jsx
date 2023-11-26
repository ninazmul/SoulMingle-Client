import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";

const NavBar = () => {

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
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
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
              <Button outline gradientDuoTone="purpleToPink" className="w-full">
                Sign In
              </Button>
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>{navBtn}</Navbar.Collapse>
      </Navbar>
    );
};

export default NavBar;
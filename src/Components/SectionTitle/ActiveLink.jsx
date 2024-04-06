import { NavLink } from "react-router-dom";


const ActiveLink = ({ to, children }) => {
    return (
        <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-white border-b-2 border-white lg:border-white lg:text-white transition cursor-pointer text-xl font-bold"
          : "text-xl font-bold"
      }
    >
      {children}
    </NavLink>
    );
};

export default ActiveLink;
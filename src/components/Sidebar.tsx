import { useState } from "react";

// ICONS //
import { LuBox, LuMessageSquare, } from "react-icons/lu";
import { RiReservedLine } from "react-icons/ri";
import { FaCar, FaUser } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { TUser } from "../types/user.type";
// ICONS //

const Sidebar = () => {
  const user  = useAppSelector(useCurrentUser) as TUser || null;
  const [activeLink, setActiveLink] = useState(0);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };
  const USER_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: <LuBox/> },
    { id: 2, path: "booking", name: "Booking List", icon: <RiReservedLine/>},
    { id: 3, path: "payment-history", name: "Payment", icon: <LuMessageSquare/> },
    { id: 4, path: "profile", name: "Profile", icon: <FaUser/> },
    
  ];

  const ADMIN_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: <LuBox /> },
    { id: 2, path: "/dashboard/user-management", name: "User Management", icon: <TbUsers />},
    { id: 3, path: "/dashboard/manage-cars", name: "Manage Cars", icon: <FaCar />},
    { id: 4, path: "/dashboard/create-car", name: "Create a Car", icon: <FaCar />},
    { id: 8, path: "/dashboard/manage-booking", name: "Manage Booking", icon: <FaCar />},

    { id: 5, path: "/dashboard/return-cars", name: "Manage Return Cars", icon: <LuMessageSquare /> },
    { id: 6, path: "/dashboard/report", name: "Report", icon: <BiSolidReport/> },
    { id: 7, path: "/dashboard/profile", name: "Profile", icon: <FaUser /> },
  ];
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen boder-r pt-8 px-4 bg-white">
      {/* logo */}
      <Link to="/" className="flex items-center gap-2 mb-10">
          <FaCar className="text-3xl leading-none hover:text-primary" />
          <span className="text-3xl font-bold font-serif leading-none hover:text-primary">QuickCar</span>
          </Link>
      {/* logo */}

      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">

        {user?.role === "admin" ? (ADMIN_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
              activeLink === index ? "bg-indigo-100 text-primary" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))) : (USER_LINKS.map((link, index) => (
            <li
              key={index}
              className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                activeLink === index ? "bg-indigo-100 text-primary" : ""
              }`}
            >
              <Link
                to={link.path}
                className="flex justify-center md:justify-start items-center md:space-x-5"
                onClick={() => handleLinkClick(index)}
              >
                <span>{link.icon}</span>
                <span className="text-sm text-gray-500 hidden md:flex">
                  {link.name}
                </span>
              </Link>
            </li>
          )))}
      </ul>
      {/* Navigation Links */}

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p onClick={handleLogout} className="flex items-center justify-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
          {" "}
          <span><IoIosLogOut /></span> <span className="hidden md:flex">Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

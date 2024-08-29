import { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaCar, FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "",
  },
  
  {
    id: 3,
    name: "CARLIST",
    link: "/cars",
  },
  {
    id: 2,
    name: "ABOUT US",
    link: "/about",
  },
  {
    id: 4,
    name: "CONTACT",
    link: "/contact",
  },
  
];
const Navbar = ({ theme, setTheme}: {theme: String, setTheme:Function}) => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  console.log({user})
  
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <div
      className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300
    "
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
          <FaCar className="text-3xl leading-none hover:text-primary" />
          <span className="text-3xl font-bold font-serif leading-none hover:text-primary">QuickCar</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </Link>
                </li>
              ))}

              
{user ? (
                <li className="relative">
                  <FaUserCircle
                    onClick={toggleDropdown}
                    className="text-3xl cursor-pointer hover:text-primary"
                  />
                  {showDropdown && (
                    <ul className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-lg font-medium  hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 "
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                         className="block px-4 py-2 text-lg font-medium  hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 "
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-lg font-medium  hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 "
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className="py-4">
                  <Link
                    to="/login"
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    <IoMdLogIn
                    className="text-3xl cursor-pointer"
                  />
                  </Link>
                </li>
              )}

              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl hover:text-primary"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl hover:text-primary"
                />
              )}
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl hover:text-primary"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl text-primary"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;

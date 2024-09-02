
import { FaUserCircle } from "react-icons/fa";

import { Navlinks } from "./Navbar";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const ResponsiveMenu = ({ showMenu }: {showMenu: boolean}) => {
  const user = useAppSelector(useCurrentUser)
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello User</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data) => (
              <li key={data.name}>
                <Link to={data.link} className="mb-5 inline-block">
                  {data.name}
                </Link>
              </li>
            ))}

{user ? (
  <>
  <li>
                  <Link to="/profile" className="mb-5 inline-block">
                    Profile
                  </Link>
                </li>
                <li>
                <Link
                  to="/dashboard"
                 className="mb-5 inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                        <button
                          onClick={handleLogout}
                          className="mb-5 inline-block"
                        >
                          Logout
                        </button>
                      </li>
  </>
                
                
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
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>
          Made with ❤ by <a>Rasel</a>{" "}
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;

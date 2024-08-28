import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingCar from "../pages/BookingCar";
import About from "../pages/About";
import ErrrorPage from "../pages/ErrroPage";
import Car from "../pages/Car";
import CarDetails from "../pages/CarDetails";
import Dashboard from "../components/layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import UserManagement from "../pages/Dashboard/UserManagement";
import CarManagement from "../pages/Dashboard/CarManagement";
import CreateCar from "../pages/Dashboard/CreateCar";
import Profile from "../components/User/Profile.jsx";
import SpecificUserBooking from "../pages/Dashboard/SpecificUserBooking.js";
import CheckOutPage from "../pages/CheckoutPage.js";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
           path: "/",
            element: <Home/>
        },
        {
           path: "/about",
           element: <About />
        },
        {
          path: "/cars",
          element: <Car />
        },
        {
          path: "/cars/:slug",
          element: <CarDetails />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register/>
        },

        {
            path: "/booking-car",
            element: <BookingCar />
        }
      ],
    },
    {
      path: "/dashboard",
      element:<Dashboard />,
      children:[
        {
          path: "",
          element: <DashboardHome/>
        },
        {
          path: "user-management",
          element: <UserManagement />
        },
        {
          path: "create-car",
          element: <CreateCar />
        },
        {
          path: "manage-cars",
          element: <CarManagement/>
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "booking",
          element: <SpecificUserBooking />
        },
        {
          path: "return/:id",
          element: <CheckOutPage />
        }
      ]
    },
    {
      path: '*',
      element: <ErrrorPage />
    }
  ]);
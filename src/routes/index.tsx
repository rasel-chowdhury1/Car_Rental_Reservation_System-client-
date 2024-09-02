import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingCar from "../pages/BookingCar";
import About from "../pages/AboutPage/About.js";
import ErrrorPage from "../pages/ErrroPage";
import Car from "../pages/Car";
import CarDetails from "../pages/CarDetails";
import Dashboard from "../components/layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import UserManagement from "../pages/Dashboard/UserManagement";
import CarManagement from "../pages/Dashboard/CarManagement";
import CreateCar from "../pages/Dashboard/CreateCar";
import SpecificUserBooking from "../pages/Dashboard/SpecificUserBooking.js";
import CheckOutPage from "../pages/CheckoutPage.js";
import TermsCondition from "../pages/TermsCondition/TermsCondition.js"
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy.js";
import Contact from "../pages/Contact/Contact.js";
import PaymentHistory from "../pages/Dashboard/PaymentHistory.js";
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
        },
        {
          path: "/terms&condition",
          element:<TermsCondition />,
        },
        {
          path: "/privacypolicy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/contact",
          element: <Contact />
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
          path: "booking",
          element: <SpecificUserBooking />
        },
        {
          path: "return/:id",
          element: <CheckOutPage />
        },
        {
          path: "payment-history",
          element: <PaymentHistory/>
        }
      ]
    },
    {
      path: '*',
      element: <ErrrorPage />
    }
  ]);
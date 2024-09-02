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
import PrivateRoute from "../components/layouts/PrivateRoute.js";


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
      element: <PrivateRoute role={undefined}><Dashboard /></PrivateRoute>,
      children:[
        {
          path: "",
          element: <DashboardHome/>
        },
        {
          path: "user-management",
          element: <PrivateRoute role="admin"> <UserManagement /> </PrivateRoute>
        },
        {
          path: "create-car",
          element: <PrivateRoute role="admin"><CreateCar /></PrivateRoute>
        },
        {
          path: "manage-cars",
          element: <PrivateRoute role="admin"><CarManagement/></PrivateRoute>
        },
    
        {
          path: "booking",
          element: <PrivateRoute role="user"> <SpecificUserBooking /></PrivateRoute>
        },
        {
          path: "return/:id",
          element:  <PrivateRoute role="user"> <CheckOutPage /></PrivateRoute>
        },
        {
          path: "payment-history",
          element: <PrivateRoute role="user"> <PaymentHistory/> </PrivateRoute>
        }
      ]
    },
    {
      path: '*',
      element: <ErrrorPage />
    }
  ]);
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingCar from "../pages/BookingCar";
import About from "../pages/About";
import ErrrorPage from "../pages/ErrroPage";

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
      path: '*',
      element: <ErrrorPage />
    }
  ]);
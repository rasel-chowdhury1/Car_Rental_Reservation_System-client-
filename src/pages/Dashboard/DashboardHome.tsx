
import {  useAppSelector } from "../../redux/hook";
import {  useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/user.type";
import SpecificUserBooking from "./SpecificUserBooking";
import Profile from "./Profile";
import { useProjectSummaryQuery } from "../../redux/features/booking/CarBookingManagementApi";
import { SerializedError } from "@reduxjs/toolkit";

const DashboardHome = () => {
    const user = useAppSelector(useCurrentUser) as TUser || null;
    console.log({user})
    const {data: summary, error, isLoading } = useProjectSummaryQuery(undefined);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading cars: {(error as SerializedError).message}</p>;
    console.log(summary?.data)
    const totalBookings = summary?.data?.totalBookings || 0; // Replace with real data
    const availableCars = summary?.data?.totalAvailableCars || 0; // Replace with real data
    const totalRevenue = summary?.data?.totalRevenue || 0;
    return (
        <div className='m-8'>
            <h3 className=' text-2xl my-4 font-bold'>Welcome to QuickCar</h3>
            {user.role === "user" ? (
        // User information view for regular users
        <div className="user-info">
          <Profile/>

          <div className="my-6">
          <SpecificUserBooking/>
          </div>
        </div>

      ) : (
        // Admin summary view
        <div className="admin-summary">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-semibold">Total Bookings</h2>
              <p className="text-2xl font-bold">{totalBookings}</p>
            </div>
            <div className="stat-card p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <p className="text-2xl font-bold">{availableCars}</p>
            </div>
            <div className="stat-card p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-semibold">Total Revenue</h2>
              <p className="text-2xl font-bold">${totalRevenue}</p>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default DashboardHome;
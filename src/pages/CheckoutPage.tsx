import React, { useState } from "react";
import { useSingleBookingQuery } from "../redux/features/booking/CarBookingManagementApi";
import { useParams } from "react-router-dom";
import getCurrentDateTime from "../utils/getCurrentDateTime";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
// import { useAppSelector } from "../redux/hooks";
// import { useCreteOrderMutation } from "../redux/api/api";

export default function CheckOutPage() {
    const {id} = useParams()
    console.log({id})
    const { data: singleBookingData, error, isLoading } = useSingleBookingQuery(id);
    const user = useAppSelector(useCurrentUser)
    if(isLoading){
        return <p>data is loading...</p>
    }

    
    const {date: endDate, currentTime: endTime} = getCurrentDateTime();
    const {startTime, date: issueDate, car} = singleBookingData?.data?.data || {};
    const {pricePerHour: perHour} = car;
    


  const startDateTime = new Date(`${issueDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  // Calculate the difference in milliseconds
  const timeDifferenceInMs = endDateTime.getTime() - startDateTime.getTime();

  // Convert milliseconds to hours
  const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);

  // Calculate the total cost
  const totalCost = timeDifferenceInHours * perHour;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value)
  
  
  console.log({totalCost})
    // const data = {
    //   user,
    //   products: cartItems.map((item) => ({
    //     product: item._id,
    //     quantity: item.quantity,
    //   })),
    // };
    // try {
    //   const res = await createOrder(data).unwrap();
    //   if (res.success) {
    //     console.log(res)
    //     window.location.href = res.data.payment_url;
    //   } else {
    //     console.error('Order creation failed:', res.message);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 border p-5 rounded">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Car
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  StartTime
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  endTime
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  PerHour
                </th>
              </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">{car?.name}</td>
                  <td className="py-3 px-4">{startTime}</td>
                  <td className="py-3 px-4">{endTime}</td>
                  <td className="py-3 px-4">{perHour}</td>
                </tr>

            </tbody>
          </table>

          <p className="mt-8"><span className="font-semibold text-lg">TotalCost :</span> {totalCost.toFixed(2)}</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

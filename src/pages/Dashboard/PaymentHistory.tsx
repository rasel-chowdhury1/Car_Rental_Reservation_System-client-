import { Link } from "react-router-dom";
import {  useMyBookingQuery } from "../../redux/features/booking/CarBookingManagementApi";


import { FaAmazonPay } from "react-icons/fa";
// import { useAppSelector } from "../../redux/hook";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
// import { TUser } from "../../types/user.type";

const PaymentHistory = () => {
    // const user = useAppSelector(useCurrentUser) as TUser || null;
    // console.log({user})
    const {data: userbooking,  isLoading} = useMyBookingQuery(undefined);
    console.log({userbooking})
    
    // console.log({userbooking})
    if(isLoading){
        return <h1>Data is loading...</h1>
    }

    const bookings = userbooking?.data || [];



    return (
     <>
       {/* Heading */}
     <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center"
        >
          Your Booking Payment
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
          Show all your car booking data that admin has returned the car bookings.Then you can pay the booking car.Just clicking the pay button!!!
        </p>
       <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Car Name</th>
                    <th>PricePerHour</th>
                    
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Total Cost</th>
                    <th>IsBooked</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings
                .filter((ele: any) => ele.isBooked === "Ended")
                .map((ele: any, idx: any) => (
                    <tr key={idx}>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                            src={ele?.car?.photo}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{ele?.car?.name}</div>
                        <div className="text-sm opacity-50">color: {ele?.car?.color}</div>
                        </div>
                    </div>
                    </td>
                    <td>{ele?.car?.pricePerHour}</td>
                    
                    <td>{ele?.startTime}</td>
                    <td>{ele?.endTime}</td>
                    <td className="font-semibold text-center">{ele?.totalCost}</td>
                    <td>{ele?.isBooked}</td>
                    <th>
{ele?.paymentStatus === 'Paid' ? (
    <div
        className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
    >
        <span className="text-green-600 font-bold hover:text-white">Payment Paid</span> 
    </div>
) : 
(
    <>
        <Link to={`/dashboard/checkout/${ele?._id}`} 
            className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
        >
            <FaAmazonPay className="text-lg" /> Payment
        </Link>
    </>
)}
                    
                    </th>
                </tr>
                ))}
                
                </tbody>
            </table>
       </div>
     </>
    );
};

export default PaymentHistory;
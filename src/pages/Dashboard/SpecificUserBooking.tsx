
import {  useDeleteBookingCarMutation, useMyBookingQuery } from "../../redux/features/booking/CarBookingManagementApi";

import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { TbTruckReturn } from "react-icons/tb";
// import { useAppSelector } from "../../redux/hook";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
// import { TUser } from "../../types/user.type";

const SpecificUserBooking = () => {
    // const user = useAppSelector(useCurrentUser) as TUser || null;
    // console.log({user})
    const {data: userbooking,  isLoading} = useMyBookingQuery(undefined);
    // console.log({userbooking})
    const [deleteBookingCar] = useDeleteBookingCarMutation();

    // console.log({userbooking})
    if(isLoading){
        return <h1>Data is loading...</h1>
    }

    const bookings = userbooking?.data || [];


    const handleDeleteBooking = async (bookingid: string, carName: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete your booking car ${carName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                     await deleteBookingCar(bookingid);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Your booking car is deleted!!!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                } catch (error) {
                    // console.log({error})
                }
            }
        });
    }



    return (
      <>
        {/* Heading */}
     <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center"
        >
          Your Booking History
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
          Show all your car booking data.You can delete booking if admin not approve your booking.
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
                    <th>IsBooked</th>
                    <th>Start Time</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((ele: any, idx: any) => (
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
                    <td>{ele?.isBooked}</td>
                    <td>{ele?.startTime}</td>
                    <th>
                    {ele?.isBooked === 'Confirmed' ? (
    <div
        className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
    >
        <TbTruckReturn className="text-lg" /> Confirmed by Admin
    </div>
) : ele?.isBooked === 'Ended' ? (
    ele?.paymentStatus === 'Paid' ? (
      <span className="text-green-600 font-bold">Payment Paid</span>
    ) : (
      <span className="text-red-600 font-bold">Payment Pending</span>
    )
  ): (
    <>
        <button 
            onClick={() => handleDeleteBooking(ele?._id, ele?.car?.name)} 
            className="btn btn-ghost btn-xs hover:bg-yellow-400 hover:text-white"
        >
            <MdDelete className="text-lg"/> Delete
        </button>
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

export default SpecificUserBooking;
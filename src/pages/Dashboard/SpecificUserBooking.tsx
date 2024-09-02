import { Link } from "react-router-dom";
import { useConfirmBookingCarMutation, useDeleteBookingCarMutation, useMyBookingQuery } from "../../redux/features/booking/CarBookingManagementApi";
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import getCurrentDateTime from "../../utils/getCurrentDateTime";
import { TbTruckReturn } from "react-icons/tb";
import { useAppSelector } from "../../redux/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const SpecificUserBooking = () => {
    const user = useAppSelector(useCurrentUser);
    console.log({user})
    const {data: userbooking,  isLoading} = useMyBookingQuery(undefined);
    const [deleteBookingCar] = useDeleteBookingCarMutation();
    const [confirmBookingCar] = useConfirmBookingCarMutation();

    console.log({userbooking})
    if(isLoading){
        return <h1>Data is loading...</h1>
    }

    const bookings = userbooking?.data?.data || [];




    const handleConfirmBooking = async (bookingId:string,carId:string,carStatus:string,carDeleted:boolean) => {
        
        console.log({bookingId, carId, carStatus, carDeleted})
        if(carStatus === "UnAvailable"){
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "This car is not available in this moment.",
              showConfirmButton: false,
              timer: 1500
            });
          }
        else if(carDeleted){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "This car is deleted",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else{
        const {date,currentTime} = getCurrentDateTime();
        
        try {
            const data = {bookingId,carId,date,startTime: currentTime, isBooked: "Confirmed"}
            const res = await confirmBookingCar(data).unwrap();
            console.log({res})
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully booking this car confirmed.",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (error) {
            console.log({error})
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
              });
            
        }
        }


      
      
    }

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
                    const res = await deleteBookingCar(bookingid);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Your booking car is deleted!!!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                } catch (error) {
                    console.log({error})
                }
            }
        });
    }



    return (
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
    <Link to={`/dashboard/return/${ele?._id}`} 
        className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
    >
        <TbTruckReturn className="text-lg" /> Return
    </Link>
) : ele?.isBooked === 'Ended' ? (
    <button 
        className="btn btn-ghost btn-xs hover:bg-blue-600 hover:text-white"
        // onClick={() => handleDoneBooking(ele?._id)}
    >
        Done
    </button>
) : (
    <>
        <button 
            onClick={() => handleConfirmBooking(ele?._id, ele?.car?._id, ele?.car?.status, ele?.car?.isDeleted)} 
            className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
        >
            <GiConfirmed className="text-lg"/> Confirm
        </button>
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
    );
};

export default SpecificUserBooking;
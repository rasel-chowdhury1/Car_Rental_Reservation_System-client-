
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { SerializedError } from "@reduxjs/toolkit";
import { useAllBookingsQuery, useConfirmBookingCarMutation, useDeleteBookingCarMutation } from "../../redux/features/booking/CarBookingManagementApi";
import { GiConfirmed } from "react-icons/gi";
import getCurrentDateTime from "../../utils/getCurrentDateTime";

const ManageBookingCar = () => {
  const {data: bookingsData,error, isLoading} = useAllBookingsQuery(undefined)
  console.log({bookingsData})
  const [deleteBookingCar] = useDeleteBookingCarMutation();
  const [confirmBookingCar] = useConfirmBookingCarMutation();



  if (isLoading) return <p>Loading...</p>;
  console.log({error});
  if (error) return <p>Error loading booking cars: {(error as SerializedError).message}</p>;
  
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

    const data = {bookingId,carId,date,startTime: currentTime, isBooked: "Confirmed"}
    const res =  await confirmBookingCar(data).unwrap();
    console.log({res})
    if(res){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully booking this car confirmed.",
            showConfirmButton: false,
            timer: 1500
          });
    }
    else{
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
          Manage Booking Cars
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
          Show all car booking data and admin can approve & delete car booking.
        </p>

    <div className="overflow-x-auto shadow-xl rounded w-full m-4">
      <table className="table ">
        {/* head */}
        <thead className="text-xl">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Car Details</th>
            <th>Currently</th>
            <th>IsBooked</th>
            <th>PaymentStatus</th>
            <th>
              <button className="btn-ghost">Action</button>
            </th>
          </tr>
        </thead>
        <tbody className="mb-4">
          {/* row 1 */}
          {bookingsData &&
            (bookingsData?.data || []).map((item: any) => (
              <tr key={item._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.car?.photo} alt={item?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.car?.name}</div>
                      <div className="text-sm opacity-50">{item?.car?.color}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{item?.car?.status}</td>
                <td className="text-center font-semibold">{item?.isBooked}</td>
                <td className="text-center font-semibold">{item?.paymentStatus}</td>
                <th>
                <>
        {item?.isBooked === "Ended" ? <>done </>
        : <>
        <button 
            onClick={() => handleConfirmBooking(item?._id, item?.car?._id, item?.car?.status, item?.car?.isDeleted)} 
            className="btn btn-ghost btn-xs hover:bg-green-600 hover:text-white"
        >
            <GiConfirmed className="text-lg"/> Approve
        </button>
        <button 
            onClick={() => handleDeleteBooking(item?._id, item?.car?.name)} 
            className="btn btn-ghost btn-xs hover:bg-yellow-400 hover:text-white"
        >
            <MdDelete className="text-lg"/> Delete
        </button>
        </>}
    </>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ManageBookingCar ;

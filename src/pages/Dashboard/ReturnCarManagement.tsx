
import { SerializedError } from "@reduxjs/toolkit";
import { useAllBookingsQuery, useReturnbookingCarMutation } from "../../redux/features/booking/CarBookingManagementApi";
import { TbTruckReturn } from "react-icons/tb";
import getCurrentDateTime from "../../utils/getCurrentDateTime";
import Swal from "sweetalert2";

const ReturnCarManagement = () => {
  const {data: bookingsData,error, isLoading} = useAllBookingsQuery(undefined)
  console.log({bookingsData})
  const [returnBookingCar] = useReturnbookingCarMutation()
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading booking cars: {(error as SerializedError).message}</p>;
  
  const handleReturnBooking = async (bookingId: string, date: string, startTime: string, carId: string, pricePerHour: number ) =>{
    console.log("clicked return id ", bookingId)
    const {date: endDate, currentTime: endTime} = getCurrentDateTime();
    const perHour = pricePerHour || 0;
    


  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  // Calculate the difference in milliseconds
  const timeDifferenceInMs = endDateTime.getTime() - startDateTime.getTime();

  // Convert milliseconds to hours
  const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);

  // Calculate the total cost
  const totalCost = timeDifferenceInHours * perHour;

  const data = {bookingId, endTime: endTime, totalCost,carId };
  const res = await returnBookingCar(data).unwrap();
  console.log({res})
  if(res){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully booking this car return.",
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

  return (
    <>
     {/* Heading */}
     <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center"
        >
           Manage Return Car
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
          Show confirmed booking car and admin can return just clicked return button!!!
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
            (bookingsData?.data || [])
            .filter((book: any) => book?.isBooked === "Confirmed")
            .map((book: any) => (
              <tr key={book._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex books-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={book?.car?.photo} alt={book?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book?.car?.name}</div>
                      <div className="text-sm opacity-50">{book?.car?.color}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{book?.car?.status}</td>
                <td className="text-center font-semibold">{book?.isBooked}</td>
                <td className="text-center font-semibold">{book?.paymentStatus}</td>
                <th>
                <button 
                  className="btn btn-ghost btn-xs hover:bg-blue-600 hover:text-white"
                  onClick={() => handleReturnBooking(book?._id,book?.date,book?.startTime,book?.car?._id,book?.car?.pricePerHour)}
              >
                  <TbTruckReturn className="text-lg" /> Return
              </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>

      
    </div>
    </>
  );
};

export default ReturnCarManagement ;

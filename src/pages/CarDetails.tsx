
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllCarsQuery } from "../redux/features/Cars/CarsManagementApi.js";
import { useAppSelector } from "../redux/hook.js";
import { useCurrentUser } from "../redux/features/auth/authSlice.js";
import getCurrentDateTime from "../utils/getCurrentDateTime.js";
import { useBookingCarMutation } from "../redux/features/booking/CarBookingManagementApi.js";
import Swal from "sweetalert2";
import { TUser } from "../types/user.type.js";

interface Car {
  _id: string;
  name: string;
  photo: string;
  pricePerHour: number;
  rating?: number;
  description: string;
  model: string;
  automatic?: boolean;
  speed?: string;
  gps?: boolean;
  seatType?: string;
  brand?: string;
  status: string;
}

const CarDetails = () => {
  const {data: CarsData,isLoading} = useGetAllCarsQuery(undefined);
  const [bookingCar] = useBookingCarMutation();
  const user = useAppSelector(useCurrentUser) as TUser || null;
  const navigate = useNavigate();
  // console.log({user})
  // console.log({CarsData})
  const { slug } = useParams();
  // console.log({slug})
  let singleCarItem: Car | undefined;
  if (CarsData) {
    singleCarItem = CarsData?.data?.find((item: Car) => item._id === slug);
  }

  // Handle the case where the car is not found
  if (!singleCarItem) {
    return <div>Car not found</div>;
  }

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);
  
  const {date, currentTime} = getCurrentDateTime();


  const handleBookNow = async () => {
    // console.log("book now button clicked")
    // console.log("status -> ",singleCarItem.status)
    if(!user){
        navigate("/login")
    }
    else if(singleCarItem?.status === "UnAvailable"){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "This car is not available in this moment.",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      const data = {carId: singleCarItem._id, isBooked: "Pending"};
      // console.log({data})
      try {
         await bookingCar(data).unwrap();
        // console.log({res})
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully booking this car in your booking list.if you want to booking confirm then move on your booking list. clicked confirm button",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        // console.log({error})
      }

      
    }
  }
  

  return (
    <section>
      <div>
        <div className="flex">
          <div className="w-1/2 sm:w-full">
            <img src={singleCarItem?.photo} alt="" className="w-full" />
          </div>

          <div className="w-1/2 sm:w-full" >
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-4">{singleCarItem?.name}</h2>

              <div className="flex items-center gap-5 mb-4 mt-3">
                <h6 className="text-xl font-bold">
                  ${singleCarItem?.pricePerHour}.00 / Hour
                </h6>

                <span className="flex items-center gap-2 text-yellow-500 text-lg">
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  <i className="ri-star-s-fill"></i>
                  ({singleCarItem?.rating} ratings)
                </span>
              </div>

              <p className="text-gray-700 mb-4">
                {singleCarItem?.description}
              </p>

              <div className="flex gap-16 mt-3">
                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-roadster-line text-yellow-500"></i>{" "}
                  {singleCarItem?.model}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-settings-2-line text-yellow-500"></i>{" "}
                  {singleCarItem?.automatic}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-timer-flash-line text-yellow-500"></i>{" "}
                  {singleCarItem?.speed}
                </span>
              </div>

              <div className="flex gap-14 mt-3">
                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-map-pin-line text-yellow-500"></i>{" "}
                  {singleCarItem?.gps}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-wheelchair-line text-yellow-500"></i>{" "}
                  {singleCarItem?.seatType}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-building-2-line text-yellow-500"></i>{" "}
                  {singleCarItem?.brand}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="p-4">
          <h5 className="text-xl font-bold mb-4">Booking Information</h5>
          <h2>Name: {user?.name}</h2>
          <p>Address: {user?.address}</p>
          <p>Phone: {user?.phone}</p>
          <p>CurrentDate: {date}</p>
          <p>StartTime: {currentTime} </p>
        </div>
        <div className="mt-5 text-center">
        <button onClick={handleBookNow} className="py-2 px-4 bg-yellow-600 text-white rounded-md border-none outline-none">
          Book Now
        </button>
      </div>

        {/* <div className="flex">
          <div className="mt-5 w-2/3">
            <div className="p-4">
              <h5 className="text-xl font-bold mb-4">Booking Information</h5>
              <BookingForm />
            </div>
          </div>

          <div className="mt-5 w-1/3">
            <div className="p-4">
              <h5 className="text-xl font-bold mb-4">Payment Information</h5>
              <PaymentMethod />
            </div>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default CarDetails;

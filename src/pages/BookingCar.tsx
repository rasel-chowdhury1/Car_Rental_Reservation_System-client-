import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ShopSideNav from "../components/pageProps/shopPage/ShopSideNav";
import { Car } from "./CarDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { TUser } from "../types/user.type";
import { useBookingCarMutation } from "../redux/features/booking/CarBookingManagementApi";
import { useGetAllCarsQuery } from "../redux/features/Cars/CarsManagementApi";
import Swal from "sweetalert2";


const BookingCar = () => {
  const { slug } = useParams();
  const user = useAppSelector(useCurrentUser) as TUser || null;
  const {data: CarsData,isLoading} = useGetAllCarsQuery(undefined);
  const [bookingCar] = useBookingCarMutation();
  const navigate = useNavigate();

  let singleCarItem: Car | undefined;
  if (CarsData) {
    singleCarItem = CarsData?.data?.find((item: Car) => item._id === slug);
  }

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

  const [bookingDetails, setBookingDetails] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    nid: "",
    license: "",
    gps: false,
    childSeat: false,
  });
  
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked; // Safe cast for HTMLInputElement

    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      try {
         await bookingCar(data).unwrap();
        setIsBooked(true);
      } catch (error) {
        // console.log({error})
      }
    }
  };

  const handleConfirm = () => {
    // Confirm the booking
    setIsConfirmed(true);
  };

    return (
        <div className="max-w-container mx-auto px-4">
        
        {/* ================= Products Start here =================== */}
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Car Details Section */}
      {!isConfirmed && (
        <>
          <h2 className="text-3xl font-bold mb-6">Car Details</h2>
          <div className="mb-8">
            <img src={singleCarItem?.photo} alt={singleCarItem?.name} className="w-full h-64 object-cover rounded-md mb-6" />
            <h3 className="text-2xl font-semibold">{singleCarItem?.name}</h3>
            <p className="text-lg text-gray-600 mb-4">{singleCarItem?.description}</p>
            <p className="mb-2"><strong>Price per hour:</strong> ${singleCarItem?.pricePerHour}</p>
            <p className="mb-2"><strong>Features:</strong> {singleCarItem?.features.join(", ")}</p>
            <p className="mb-2"><strong>Insurance Options:</strong> Comprehensive, Third-Party</p>
            <p><strong>Cancellation Policy:</strong> Free cancellation within 24 hours</p>

            <button
              className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={handleConfirm}
            >
              Book Now 
            </button>
          </div>
        </>
      )}

      {/* Booking Form Section */}
      {isConfirmed && !isBooked && (
        <>
          <h2 className="text-3xl font-bold mb-6">Booking Form</h2>
          <form onSubmit={handleSubmit}>
            {/* User Information */}
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
                    value={bookingDetails.name}
                    onChange={handleChange}
                    required
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
                    value={bookingDetails.email}
                    onChange={handleChange}
                    required
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
                    value={bookingDetails.phone}
                    onChange={handleChange}
                    required
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
                    value={bookingDetails.address}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    NID/Passport
                  </label>
                  <input
                    type="text"
                    name="nid"
                    placeholder="Enter NID/Passport number"
                    value={bookingDetails.nid}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Driving License
                  </label>
                  <input
                    type="text"
                    name="license"
                    placeholder="Enter Driving License number"
                    value={bookingDetails.license}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Additional Options */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Additional Options
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="gps"
                        checked={bookingDetails.gps}
                        onChange={handleChange}
                        className="form-checkbox text-green-500"
                      />
                      <span className="ml-2 text-sm">GPS</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="childSeat"
                        checked={bookingDetails.childSeat}
                        onChange={handleChange}
                        className="form-checkbox text-green-500"
                      />
                      <span className="ml-2 text-sm">Child Seat</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <p><strong>Car:</strong> {singleCarItem?.name}</p>
              <p><strong>Price per hour:</strong> ${singleCarItem?.pricePerHour}</p>
            </div>

            {/* Proceed to booking */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </form>
        </>
      )}

      {/* Booking Confirmation Section */}
      {isBooked && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Booking Confirmation</h2>
          <p>Your booking request accepted!</p>
          <p>
            Thank you for booking <strong>{singleCarItem?.name}</strong>. We'll be confirm your booking soon.
          </p>
        </div>
      )}
    </div>
          </div>
        </div>
        {/* ================= Products End here ===================== */}
      </div>
    );
};

export default BookingCar;
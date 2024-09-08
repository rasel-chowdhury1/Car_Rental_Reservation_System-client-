
import { Link,  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllCarsQuery } from "../redux/features/Cars/CarsManagementApi.js";
import ZoomImage from "../components/ZoomImage/ZoomImage.js";


export interface Car {
  _id: string;
  name: string;
  photo: string;
  pricePerHour: number;
  rating?: number;
  description: string;
  model: string;
  automatic?: boolean;
  speed?: string;
  color: string;
  gps?: boolean;
  seatType?: string;
  brand?: string;
  status: string;
  features: string[]
}

const CarDetails = () => {
  const {data: CarsData,isLoading} = useGetAllCarsQuery(undefined);
  
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
  

  

  return (
    <section>
      <div>
        <div className="flex">
          <div className="w-1/2 sm:w-full">
          <ZoomImage src={singleCarItem?.photo} alt={singleCarItem?.name} />
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
                  <span className="font-semibold">Model:</span> {singleCarItem?.model}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-settings-2-line text-yellow-500"></i>{" "}
                    <span className="font-semibold">Status: </span>{singleCarItem?.status}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <i className="ri-timer-flash-line text-yellow-500"></i>{" "}
                  <span className="font-semibold">Color: </span>{singleCarItem?.color}
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


        <div className="mt-5 text-center">
          <Link to={`/dashboard/bookings/${slug}`}>
            <button  className="py-2 px-4 bg-yellow-600 text-white rounded-md border-none outline-none">
              Book Now
            </button>
          </Link>
      </div>

      </div>
    </section>
  );
};

export default CarDetails;

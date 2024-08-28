
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import { RiSortAsc } from "react-icons/ri";
import CarItem from "../CarItem/CarItem";
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsManagementApi.js";

const carList = [
  {
    name: "BMW UX",
    price: 100,
    image: whiteCar,
    aosDelay: "0",
  },
  {
    name: "KIA UX",
    price: 140,
    image: car2,
    aosDelay: "500",
  },
  {
    name: "BMW UX",
    price: 100,
    image: car3,
    aosDelay: "1000",
  },
];

const CarList = () => {
  const {data: CarsData, error, isLoading} = useGetAllCarsQuery(undefined);

  console.log({CarsData})
  if(isLoading){
    return <h1>data is loading</h1>
  }
  return (
    <div className="pt-16">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Lorem ipsum dolor
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor iure
          nemo ab?
        </p>

        <div className=" flex items-center gap-3 mb-5">
                <span className=" flex items-center gap-2">
                  <RiSortAsc /> <p>Sort By</p>
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>

        {/* Car listing */}

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {CarsData?.data.map((data) => (
              <CarItem item={data} key={data._id}  />
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button data-aos="fade-up" className="button-outline">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;

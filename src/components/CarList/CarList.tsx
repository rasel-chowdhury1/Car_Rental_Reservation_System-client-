import  { useState } from "react";
import { RiSortAsc } from "react-icons/ri";
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsManagementApi";
import CarItem from "../CarItem/CarItem";
import { TCar } from "../../types/car.type";
import { Link } from "react-router-dom";



const CarList = ({ status }: { status?: string }) => {
  const { data: CarsData, error, isLoading } = useGetAllCarsQuery(undefined);

  const [sortOrder, setSortOrder] = useState(''); // For sorting
  const [carType, setCarType] = useState(''); // For filtering by car type
  const [priceRange, setPriceRange] = useState([0, 100000]); // For filtering by price range
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const handleCarTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(event.target.value);
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [minPrice, maxPrice] = event.target.value.split('-').map(Number);
    setPriceRange([minPrice, maxPrice]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Apply filters
  const filteredCars =  Array.isArray(CarsData?.data) ? CarsData?.data.filter((car: TCar) => {
    return (
      (carType ? car!.model!.toLowerCase() === carType.toLowerCase() : true) &&
      (car.pricePerHour >= priceRange[0] && car.pricePerHour <= priceRange[1]) &&
      (car.name.toLowerCase().includes(searchQuery) || car.description.toLowerCase().includes(searchQuery)) &&
      (status === "available" ? car.status === "available" : true)
    );
  }): [];

  // Apply sorting
  const sortedCars = filteredCars?.sort((a: TCar, b: TCar) => {
    if (sortOrder === 'low') {
      return a.pricePerHour - b.pricePerHour;
    }
    if (sortOrder === 'high') {
      return b.pricePerHour - a.pricePerHour;
    }
    return 0;
  });

  console.log({sortedCars})

  if (isLoading) {
    return <h1>Data is loading...</h1>;
  }

  if (error) {
    const errorMessage = 
      (error as { message?: string }).message ||
      "An unknown error occurred";
    return <h1>Error loading data: {errorMessage}</h1>;
  }

  return (
    <div className="pt-16">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center"
        >
          Car Listings
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
          Browse through our collection of cars. Apply filters to narrow down your search.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input input-bordered"
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <RiSortAsc /> <p>Sort By</p>
            </span>
            <select value={sortOrder} onChange={handleSortChange} className="select select-bordered">
              <option value="">Select</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>

          {/* Car Type Filter */}
          <div className="flex items-center gap-3">
            <p>Type</p>
            <select value={carType} onChange={handleCarTypeChange} className="select select-bordered">
              <option value="">All</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-3">
            <p>Price Range</p>
            <select onChange={handlePriceRangeChange} className="select select-bordered">
              <option value="0-100000">All</option>
              <option value="0-50">Up to $50</option>
              <option value="51-100">Up to $100</option>
              <option value="101-200">Up to $200</option>
              <option value="201-500">Up to $500</option>
            </select>
          </div>
        </div>

        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sortedCars?.map((car: TCar) => (
              <CarItem item={car} key={car._id} />
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <Link to="cars" data-aos="fade-up" className="button-outline">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarList;

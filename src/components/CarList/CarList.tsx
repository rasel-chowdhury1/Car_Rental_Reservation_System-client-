import React, { useState } from "react";
import { RiSortAsc } from "react-icons/ri";
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsManagementApi";
import CarItem from "../CarItem/CarItem";

const CarList = () => {
  const { data: CarsData, error, isLoading } = useGetAllCarsQuery(undefined);

  const [sortOrder, setSortOrder] = useState(''); // For sorting
  const [carType, setCarType] = useState(''); // For filtering by car type
  const [priceRange, setPriceRange] = useState([0, 100000]); // For filtering by price range
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCarTypeChange = (event) => {
    setCarType(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    const [minPrice, maxPrice] = event.target.value.split('-').map(Number);
    setPriceRange([minPrice, maxPrice]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Apply filters
  const filteredCars = CarsData?.data.filter(car => {
    return (
      (carType ? car.type === carType : true) &&
      (car.pricePerHour >= priceRange[0] && car.pricePerHour <= priceRange[1]) &&
      (car.name.toLowerCase().includes(searchQuery) || car.description.toLowerCase().includes(searchQuery))
    );
  });

  // Apply sorting
  const sortedCars = filteredCars?.sort((a, b) => {
    if (sortOrder === 'low') {
      return a.pricePerHour - b.pricePerHour;
    }
    if (sortOrder === 'high') {
      return b.pricePerHour - a.pricePerHour;
    }
    return 0;
  });

  if (isLoading) {
    return <h1>Data is loading...</h1>;
  }

  if (error) {
    return <h1>Error loading data: {error.message}</h1>;
  }

  return (
    <div className="pt-16">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Car Listings
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {sortedCars?.map((car) => (
              <CarItem item={car} key={car._id} />
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

import { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

interface BreadcrumbsProps {
  prevLocation: string;
  title: string;
}


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ prevLocation, title }) => {
  // console.log({prevLocation})
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");
  useEffect(() => {
    // console.log({location})
    setLocationPath(location.pathname.split("/")[1]);
    // console.log({location})
  }, [location]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span> {prevLocation === "" ? "Home" : prevLocation}</span>
         
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

export default Breadcrumbs;

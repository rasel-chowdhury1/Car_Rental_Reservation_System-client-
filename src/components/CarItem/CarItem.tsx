
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

const CarItem = (props) => {
  const { _id, name, pricePerHour, photo } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="border border-[#7c8a9736] p-5 rounded-sm">
        <div className="mb-4">
          <img src={photo} alt={name} className="w-full" />
        </div>

        <div className="mt-4">
          <h4 className="text-2xl text-center font-semibold">{name}</h4>
          <h6 className="text-xl text-center mt-1 font-semibold">
            ${pricePerHour}.00 <span>/ Hour</span>
          </h6>

          <div className="flex flex-wrap items-center justify-between mt-3 mb-4 text-sm">
            <span className="flex items-center gap-1 text-yellow-500 text-lg">
              <i className="ri-car-line"></i> model 3
            </span>
            <span className="flex items-center gap-1 text-yellow-500 text-lg">
              <i className="ri-settings-2-line"></i> isElectric
            </span>
            <span className="flex items-center gap-1 text-yellow-500 text-lg">
              <i className="ri-timer-flash-line"></i> speed 500
            </span>
          </div>

          <div className="flex">
            <button className="w-1/2 bg-[#000d6b] text-white py-2 px-4 rounded-none border-none outline-none text-sm font-medium">
              <Link to={`/cars/${_id}`}>Rent</Link>
            </button>

            <button className="w-1/2 bg-[#f9a826] text-white py-2 px-4 rounded-br-md text-sm font-medium">
              <Link to={`/cars/${_id}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;

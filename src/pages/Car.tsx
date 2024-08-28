import CarList from "../components/CarList/CarList";
import CommonSection from "../components/CommonSection";


const Car = () => {
    return (
        <div>
          <CommonSection title="Car Listing" />
          <CarList />
        </div>
    );
};

export default Car;
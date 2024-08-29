
import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 w-full mb-8 md:mb-0">
          <img src={driverImg} alt="" className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Do You Want to Earn With Us? So Don't Be Late
          </h2>
          <button className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-md">
            Become a Driver
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomeDriverSection;

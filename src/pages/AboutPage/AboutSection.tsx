
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }:{aboutClass: string}) => {
  return (
    <section
      className={`py-16 ${aboutClass === "aboutPage" ? "mt-0" : "mt-28"}`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-gray-600 text-lg">About Us</h4>
            <h2 className="text-3xl font-semibold mb-4">
              Welcome to car rent service
            </h2>
            <p className="text-gray-600 mb-4">
            We offer a seamless car rental experience tailored to your needs. With a wide selection of vehicles, we ensure that you find the perfect car for any occasion, whether it’s a business trip, a family vacation, or a weekend getaway.
            </p>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-gray-600">
                <i className="ri-checkbox-circle-line text-blue-700"></i> Our commitment to quality and customer satisfaction sets us apart.
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <i className="ri-checkbox-circle-line text-blue-700"></i> We provide a range of vehicles.
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <i className="ri-checkbox-circle-line text-blue-700"></i> That cater to every preference and budget.
              </p>
            </div>
          </div>
          <div>
            <img src={aboutImg} alt="About Us" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import CommonSection from "../../components/CommonSection";
import AboutSection from "./AboutSection";
import BecomeDriverSection from "./BecomeDriverSection";
import OurMembers from "./OurMembers";
import driveImg from "../../assets/drive.jpg"


const About = () => {
    return (
        <div>
             <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="my-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="about__page-img">
              <img src={driveImg} alt="" className="w-full rounded-lg" />
            </div>
            <div className="about__page-content">
              <h2 className="text-3xl font-semibold mb-4">
                We Are Committed To Provide Safe Ride Solutions
              </h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eveniet veniam assumenda aperiam accusantium ex autem
                perferendis repellendus nostrum delectus. Nemo et dolore est
                tempore rem minima adipisci magni dolorum ipsam.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eveniet veniam assumenda aperiam accusantium ex autem
                perferendis repellendus nostrum delectus. Nemo et dolore est
                tempore rem minima adipisci magni dolorum ipsam.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl text-blue-700">
                  <i className="ri-phone-line"></i>
                </span>
                <div>
                  <h6 className="text-gray-600">Need Any Help?</h6>
                  <h4 className="text-xl font-semibold">+00123456789</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BecomeDriverSection />

      <section>
        <div className="container mx-auto text-center">
          <h6 className="text-gray-600 mb-2">Experts</h6>
          <h2 className="text-3xl font-semibold mb-8">Our Members</h2>
          <OurMembers />
        </div>
      </section>
        </div>
    );
};

export default About;
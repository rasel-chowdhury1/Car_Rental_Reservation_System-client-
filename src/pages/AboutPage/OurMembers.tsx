
import { Link } from "react-router-dom";
import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";

const OUR_MEMBERS = [
  {
    name: "Jhon Doe",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava01,
  },
  {
    name: "David Lisa",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava02,
  },
  {
    name: "Hilton King",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava03,
  },
  {
    name: "Jhon Doe",
    experience: "5 years of experience",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava01,
  },
];

const OurMembers = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {OUR_MEMBERS.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 relative group"
        >
          <div className="relative">
            <img
              src={item.imgUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg">
              <div className="flex gap-2">
                <Link to={item.fbUrl} className="text-white p-2 bg-white rounded-full">
                  <i className="ri-facebook-line text-blue-900"></i>
                </Link>
                <Link to={item.twitUrl} className="text-white p-2 bg-white rounded-full">
                  <i className="ri-twitter-line text-blue-900"></i>
                </Link>
                <Link to={item.linkedinUrl} className="text-white p-2 bg-white rounded-full">
                  <i className="ri-linkedin-line text-blue-900"></i>
                </Link>
                <Link to={item.instUrl} className="text-white p-2 bg-white rounded-full">
                  <i className="ri-instagram-line text-blue-900"></i>
                </Link>
              </div>
            </div>
          </div>
          <h6 className="text-center mt-3 text-lg font-semibold">{item.name}</h6>
          <p className="text-center text-gray-600">{item.experience}</p>
        </div>
      ))}
    </div>
  );
};

export default OurMembers;

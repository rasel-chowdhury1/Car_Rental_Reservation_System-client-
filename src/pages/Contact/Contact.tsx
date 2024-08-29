import { FiSend } from "react-icons/fi";
import { useState } from "react";
import Con from "../../../public/contact.json"
import Lottie from "lottie-react";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = () => {
   
  };
  return (
    <div className="px-10 py-20">
      <div className="text-center mt-3 mb-5">
        <div className="flex flex-col md:flex-row-reverse  items-center justify-between mt-0 mb-10">
          <div className="w-full md:w-1/3 mx-10 text-center md:text-start">
            <h1 className="text-4xl md:text-5xl font-bold  ">Contact Us</h1>
            <p className="text-sm  my-2 ">Get in touch with us. We will respond as soon as possible.</p>
            <p className="text-sm  my-2 ">Reach Out for any type of Inquiries, or Just to Say Hi!</p>
            <p className="text-sm  my-2 ">Send us a message!</p>
          </div>
          <div className="w-full md:w-1/2 ml-10">
            <Lottie animationData={Con} loop={true} />
          </div>
          </div>
        </div>



      <section>
        <h1 className="text-3xl md:text-4xl  pt-10 md:pt-10 font-bold ">
          Get in Touch
        </h1>
        <hr className="w-[44%] md:w-[18%] h-1 bg-gradient-to-r from-[#141679] to-[#73e9fe] " />
        <div className="flex flex-col md:flex-row justify-center items-center mt-6">

          <div className="w-full md:w-1/2 h-[300px] md:h-[350px] flex justify-center ">
            <img
              src="https://i.ibb.co/m6VC4xg/Online-report-bro.png"
              alt=""
              className="h-full"
            />
          </div>
          <div className="w-full md:w-1/2">

            <form
              onSubmit={handleSubmit}
              className=" flex flex-col justify-center  gap-4 h-[500px]"
            >
              <input
                required
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-4 py-3 outline-none rounded-lg text-lg border-2 bg-gray-50 dark:bg-slate-950"
              />
              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 outline-none rounded-lg text-lg border-2 bg-gray-50 dark:bg-slate-950"
              />
              <textarea
                required
                name="message"
                placeholder="Enter your message..."
                
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-4 py-3 outline-none rounded-lg text-lg border-2 bg-gray-50 dark:bg-slate-950"
              ></textarea>

              <div className="flex w-full justify-end p-2">
                <button value="Send" type="submit" className="btn px-5 py-3">
                  Send <FiSend className="text-lg" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <>
      <span id="contact"></span>
      <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14">
        <div className="container ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-800 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Let's collaborate on your upcoming car rental venture
              </h1>
              <p className="text-gray-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Exercitationem necessitatibus quasi et vel,{" "}
              </p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <a
                href="#"
                className="inline-block font-semibold py-2 px-6 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase "
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
    
      </section>
    </div>
  );
};

export default Contact;

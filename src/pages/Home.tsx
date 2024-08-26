import { useState } from "react";
import About from "../components/About/About";
import AppStoreBanner from "../components/AppStoreBanner/AppStoreBanner";
import CarList from "../components/CarList/CarList";
import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Testimonial from "../components/Testimonial/Testimonial";


const Home = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
    return (
        <div>
            <Hero theme={theme} />
             <About />
             <CarList />
             <Services />
             <Testimonial />
             <AppStoreBanner />
             <Contact />
        </div>
    );
};

export default Home;
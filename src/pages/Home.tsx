import { useState } from "react";
import About from "../components/About/About";
import AppStoreBanner from "../components/AppStoreBanner/AppStoreBanner";
import CarList from "../components/CarList/CarList";
import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Testimonial from "../components/Testimonial/Testimonial";


const Home = () => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const [theme, setTheme] = useState(storedTheme || "light");
  
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };
    return (
        <div>
            <Hero theme={theme} />
             <About />
             <CarList />
             <Services />
             <Testimonial />
             <AppStoreBanner />
             <Contact />
             <button onClick={toggleTheme} className="mt-4">
        Toggle Theme
      </button>
        </div>
    );
};

export default Home;
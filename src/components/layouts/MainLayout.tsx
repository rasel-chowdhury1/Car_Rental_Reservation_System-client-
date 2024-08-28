import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const MainLayout = ({theme, setTheme}: {theme: String, setTheme:Function}) => {
    return (
        <div>
            <Navbar theme={theme} setTheme={setTheme} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
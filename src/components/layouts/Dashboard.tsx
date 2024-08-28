

import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div className="flex h-screen">
           <Sidebar/>
           {/* Main Content */}
            <div className="flex-1 ml-16 md:ml-56 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
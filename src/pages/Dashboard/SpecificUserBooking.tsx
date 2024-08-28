import { Link } from "react-router-dom";
import { useMyBookingQuery } from "../../redux/features/booking/CarBookingManagementApi";

const SpecificUserBooking = () => {
    const {data: userbooking, error, isLoading} = useMyBookingQuery(undefined);
    

    console.log({userbooking})
    if(isLoading){
        return <h1>Data is loading...</h1>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Car Name</th>
                    <th>Job</th>
                    <th>Color</th>
                    <th>Issue Date</th>
                    <th>Start Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {userbooking?.data.data.map((ele, idx) => (
                    <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                            src={ele?.car?.photo}
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{ele?.car?.name}</div>
                        <div className="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                    </td>
                    <td>{ele?.car.color}</td>
                    <td>{ele?.date}</td>
                    <td>{ele?.startTime}</td>
                    <th>
                    <Link to={`/dashboard/return/${ele._id}`} className="btn btn-ghost btn-xs">return</Link>
                    </th>
                </tr>
                ))}
                
                </tbody>
            </table>
        </div>
    );
};

export default SpecificUserBooking;
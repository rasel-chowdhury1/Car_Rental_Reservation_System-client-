import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/Cars/CarsManagementApi";

const CarManagement = () => {
  const {data: carData} = useGetAllCarsQuery(undefined);
  console.log({carData})
    return (
      <div className="overflow-x-auto shadow-xl rounded w-full m-4">
                <table className="table ">
                    {/* head */}
                    <thead className=' text-2xl'>
                        <tr>
                           <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th> <button className='btn-ghost'>Action</button></th>
                            <Link to='/admin/addProduct' className="btn" >Add New Product</Link>
                        </tr>
                    </thead>
                    <tbody className='mb-4'>
                        {/* row 1 */}
                        {
                            carData && carData?.data.map( (item) => <tr key={item._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.photo} alt={item?.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item?.name}</div>
                                            <div className="text-sm opacity-50">{item?.color}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">
                                    {item.isStatus}
                                </td>
                                <td>{item?.pricePerHour}</td>
                                <th>
                                    <button className="btn btn-accent  p-2 m-2">details</button>
                                    <button className="btn btn-neutral px-4  py-2">Edit</button>
                                    <button className="btn btn-secondary  p2 m-2">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* foot */}
                    

                </table>
            </div>
    );
};

export default CarManagement;
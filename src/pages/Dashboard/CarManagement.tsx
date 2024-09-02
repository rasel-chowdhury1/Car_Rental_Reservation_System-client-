import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCarMutation, useGetAllCarsQuery } from "../../redux/features/Cars/CarsManagementApi";
import { FaRegEdit } from "react-icons/fa";
import UpdateCar from "./UpdateCar";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import Swal from "sweetalert2";

const CarManagement = () => {
  const { data: carData, error, isLoading } = useGetAllCarsQuery(undefined);
  const [deleteCar] = useDeleteCarMutation();

  const handleDeleteCar = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteCar(id).unwrap();
        Swal.fire('Deleted!', 'The car has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'There was an error deleting the car.', 'error');
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars: {error.message}</p>;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleOpenModal = (car: any) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded w-full m-4">
      <table className="table ">
        {/* head */}
        <thead className="text-xl">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Car Details</th>
            <th>currently</th>
            <th>Price Per Hour</th>
            <th>
              <button className="btn-ghost">Action</button>
            </th>
            <Link to="/dashboard/create-car" className="btn">
              Add New Car
            </Link>
          </tr>
        </thead>
        <tbody className="mb-4">
          {/* row 1 */}
          {carData &&
            carData?.data.map((item: any) => (
              <tr key={item._id}>
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
                <td className="font-bold">{item.status}</td>
                <td className="text-center font-semibold">{item?.pricePerHour}</td>
                <th>
                  <div className="flex items-center ">
                  <button  className="p-2 m-2">
                   <Link to={`/cars/${item._id}`}>
                  <BiDetail className="text-2xl cursor-pointer hover:text-yellow-500"/>
                  </Link>
                  </button>
                  <button
                    className="px-4 py-2"
                    onClick={() => handleOpenModal(item)}
                  >
                    <FaRegEdit className="text-xl hover:text-yellow-500" />
                  </button>
                  <button className="p-2 m-2" onClick={() => handleDeleteCar(item._id)}>
                  <MdDeleteForever className="text-2xl cursor-pointer hover:text-yellow-500"/>
                  </button>
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Car</h2>
            <UpdateCar previewsData={selectedCar} onClose={handleCloseModal} />
            <button
              className="btn btn-secondary mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;

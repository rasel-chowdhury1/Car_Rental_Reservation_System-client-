import { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {  useAppSelector } from "../../redux/hook";
import { TUser } from "../../types/user.type";
import UpdateUser from "../UpdateUser";

const Profile = () => {
    const user = useAppSelector(useCurrentUser) as TUser || null;
    console.log({user});
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return (
      <div className="user-info">
      <div className="mb-8 border p-5 rounded">
        <h3 className="text-xl text-center font-semibold mb-4">User Information</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Name
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              {user.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Email
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              {user.email}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Phone
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              {user.phone}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Address
            </label>
            <div className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500">
              {user.address}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
      <button
        onClick={handleOpenModal}
        className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Edit Profile
      </button>
    </div>

    {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Your Profile</h2>
        <UpdateUser previewsData={user} onClose={handleCloseModal} />
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

export default Profile;
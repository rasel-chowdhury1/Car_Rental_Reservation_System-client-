import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";
import { TUser } from "../../types/user.type";

const UserManagement = () => {
  const { data: userData, error, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [selectedRole, setSelectedRole] = useState<{ [key: string]: string }>({});
  const [selectedActive, setSelectedActive] = useState<{ [key: string]: boolean }>({});

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = 
      (error as { message?: string }).message ||
      "An unknown error occurred";
    return <h1>User loading error data: {errorMessage}</h1>;
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole({ userId, role: newRole }).unwrap();
      console.log({res})
      setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
      // console.log("Role updated successfully:", res);
    } catch (error) {
      // console.error("Error updating role:", error);
    }
  };

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      const res = await updateUserRole({ userId, isActive }).unwrap();
      console.log({res})
      setSelectedActive((prev) => ({ ...prev, [userId]: isActive }));
      // console.log("Status updated successfully:", res);
    } catch (error) {
      // console.error("Error updating status:", error);
    }
  };

  return (
    <>
    {/* Heading */}
    <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center"
        >
          User Management 
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10  text-center">
            Show all users data and if admin want to update user role.it can
        </p>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(userData?.data || []).map((item :TUser, idx: number) => (
            <tr key={item._id}>
              <th>{idx + 1}</th> {/* Row number */}
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <select
                  value={selectedRole[item._id] || item.role}
                  onChange={(e) => handleRoleChange(item._id, e.target.value)}
                  className="select select-bordered"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                  <select
                    value={
                      selectedActive[item._id] !== undefined
                        ? (selectedActive[item._id] ? "active" : "blocked")
                        : item.isActive
                        ? "active"
                        : "blocked"
                    }
                    onChange={(e) => handleStatusChange(item._id, e.target.value === "active")}
                    className="select select-bordered"
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default UserManagement;

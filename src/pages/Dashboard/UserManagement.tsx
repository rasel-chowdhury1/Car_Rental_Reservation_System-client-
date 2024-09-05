import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";
import { TUser } from "../../types/user.type";

const UserManagement = () => {
  const { data: userData, error, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [selectedRole, setSelectedRole] = useState<{ [key: string]: string }>({});

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
      setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
      console.log("Role updated successfully:", res);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

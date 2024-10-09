import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/slices/userSlice"; // Adjust the import path
import ChangeUserRole from "./ChangeUserRole";

const People = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user); // Get users, loading, and error from Redux state

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch the action to fetch users
  }, [dispatch]);

  // Loading state
  if (loading) return <div className="p-10">Loading...</div>;

  // Error state
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">People</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500">Role: {user.role?.roleName}</p>
            <ChangeUserRole user={user} currentRole={user.role?.roleName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;

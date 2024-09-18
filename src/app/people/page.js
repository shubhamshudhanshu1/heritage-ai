import React from "react";
import ChangeUserRole from "./ChangeUserRole";

async function fetchUsers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        cache: "no-store",
      }
    );
    const data = await response?.json();
    if (data.success) {
      return data.data || [];
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

const People = async () => {
  const users = await fetchUsers();

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

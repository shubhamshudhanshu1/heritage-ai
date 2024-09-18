"use client";
import { Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

function ChangeUserRole({ currentRole, user = {} }) {
  const [role, setRole] = useState(currentRole);
  const [error, setError] = useState(null);

  const { data: session } = useSession();

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setRole(newRole);

    try {
      const response = await fetch(`/api/users/${user._id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }
    } catch (err) {
      setError("Error updating role");
      console.error(err);
    }
  };

  if (session?.user?.email === user.email) {
    return <Chip label="Current User" color="success" variant="outlined" />;
  }

  return (
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Change Role
      </label>
      <select
        id="role"
        value={role}
        onChange={handleRoleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default ChangeUserRole;

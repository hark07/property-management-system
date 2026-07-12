import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import API from "../../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/users");

      setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, {
        role,
      });

      toast.success("Role updated successfully");

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Role update failed");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/users/${id}/status`);

      toast.success("Status updated");

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);

      toast.success("User deleted");

      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          Loading users...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Manage Users
      </h1>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-x-auto
      "
      >
        <table
          className="
          w-full
          text-left
        "
        >
          <thead
            className="
            bg-gray-100
          "
          >
            <tr>
              <th className="p-4">Name</th>

              <th className="p-4">Email</th>

              <th className="p-4">Role</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="
                  border-t
                "
              >
                <td className="p-4 font-semibold">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                    className="
                      border
                      rounded
                      px-3
                      py-2
                    "
                  >
                    <option value="admin">Admin</option>

                    <option value="owner">Owner</option>

                    <option value="tenant">Tenant</option>

                    <option value="staff">Staff</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-white
                      ${user.isActive ? "bg-green-600" : "bg-red-600"}
                    `}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;

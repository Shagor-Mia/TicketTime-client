import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import useSecureAxios from "../../../hooks/useSecureAxios";
import UserDetailsModal from "../../../components/Modals/UserDetailsModal";

const ManageUsers = () => {
  const axiosSecure = useSecureAxios();
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeUser = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make this user an ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role }).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `${user.displayName} is now ${role}!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    document.getElementById("user_details_modal")?.showModal();
  };

  return (
    <div className="my-10 mx-auto max-w-6xl px-2 dark:bg-black">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-3 text-center">
        Manage Users ({users.length})
      </h1>

      {/* Search */}
      <div className="my-3 flex items-center gap-2 max-w-sm mx-auto">
        <input
          type="search"
          placeholder="Search users..."
          className="input w-full"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="avatar" />
                      </div>
                    </div>
                    <p className="font-bold">{user.displayName}</p>
                  </div>
                </td>

                <td>
                  <span className="badge badge-ghost badge-sm">
                    {user.email}
                  </span>
                </td>

                <td>{user.role}</td>

                <td className="flex gap-1 flex-wrap justify-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleMakeUser(user, "user")}
                      className="btn btn-sm"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user, "admin")}
                      className="btn btn-sm"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => openDetailsModal(user)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal user={selectedUser} />
    </div>
  );
};

export default ManageUsers;

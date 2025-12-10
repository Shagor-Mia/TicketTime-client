import React from "react";

const UserDetailsModal = ({ user }) => {
  return (
    <dialog
      id="user_details_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-3">User Details</h3>

        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={user.photoURL} alt="User" />
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>

            <p>
              <span className="font-semibold">User ID:</span> {user._id}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UserDetailsModal;

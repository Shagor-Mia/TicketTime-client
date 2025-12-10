import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useNavigate } from "react-router";

const UpdateProfileModal = () => {
  const { user, setUser, setLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useSecureAxios();

  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  // --- Open / Close modal ---
  const openModal = () => {
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => modalRef.current?.close(), 200);
  };

  // --- Handle profile update ---
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const displayName = form.name.value;
    const photoURL = form.photo.value;

    try {
      setLoading(true);
      //   firebase update
      await updateUserProfile(displayName, photoURL);
      // database update
      await axiosSecure.patch(`/users?email=${user.email}`, {
        displayName,
        photoURL,
      });

      const updatedUser = { ...user, displayName, photoURL };

      setUser(updatedUser);
      setLoading(false);

      closeModal();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been updated successfully.",
      });
      e.target.reset();
    } catch (err) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong while updating profile.",
      });
      navigate("/dashboard/profile");
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={openModal}
        className="btn md:text-[16px] text-xs bg-green-600 text-white hover:opacity-90 border-0 mr-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Update
      </motion.button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-middle">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="update-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="modal-box relative bg-base-100 text-base-content md:rounded-2xl rounded-xl shadow-2xl"
            >
              <h3 className="font-bold text-2xl text-center text-purple-700 mb-4">
                Update Profile
              </h3>

              <form onSubmit={handleProfileUpdate} className="space-y-3 mt-4">
                {/* Name */}
                <div>
                  <label className="font-semibold text-base-content">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.displayName || ""}
                    required
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="font-semibold text-gray-700">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    defaultValue={user.photoURL || ""}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Email (readonly) */}
                <div>
                  <label className="font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full mt-1  cursor-not-allowed"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn bg-gray-300 hover:bg-gray-400"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
};

export default UpdateProfileModal;

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSecureAxios from "../../hooks/useSecureAxios";

import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const locations = [
  { name: "Jatrabari", type: "bus" },
  { name: "Saydabad", type: "bus" },
  { name: "Dolaipar", type: "bus" },
  { name: "Gabtoli", type: "bus" },
  { name: "Polto", type: "bus" },
  { name: "Matijhil", type: "bus" },
  { name: "Komolapur", type: "railway" },
  { name: "Dhaka Airport", type: "air" },
  { name: "Tangail", type: "bus" },
  { name: "Rajshahi", type: "bus/train/air" },
  { name: "Barisal", type: "bus/train/air" },
  { name: "Khulna", type: "bus/train/air" },
  { name: "Chattogram", type: "bus/train/air" },
  { name: "Cumilla", type: "bus/train" },
  { name: "Cox’s Bazar", type: "bus/air" },
  { name: "Sylhet", type: "bus/train/air" },
  { name: "Rangpur", type: "bus/train" },
  { name: "Jessore", type: "bus/train" },
  { name: "Mymensingh", type: "bus/train" },
];
const tickets = ["Air Ticket, Plane", "Train Ticket", "Bus Ticket"];

const BeAVendorModal = ({ user }) => {
  const axiosSecure = useSecureAxios();
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // --- Open / Close modal safely ---
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // --- Handle vendor application ---
  const handleBeAVendor = async (data) => {
    try {
      const payload = { ...data, email: user?.email };
      const res = await axiosSecure.post("/vendors", payload);

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application Submitted",
          text: "We will reach you through email.",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        closeModal();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Trigger Button */}
      <motion.button
        onClick={openModal}
        className="btn bg-purple-600 text-white hover:opacity-90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Apply to be a Vendor
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <dialog ref={modalRef} className="modal modal-middle" open>
            <motion.div
              key="vendor-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="modal-box relative bg-base-100 text-base-content md:rounded-2xl rounded-xl shadow-2xl"
            >
              <h2 className="font-bold text-3xl text-center text-purple-700 mb-6">
                Be a Vendor (Ticket Seller)
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                <form
                  onSubmit={handleSubmit(handleBeAVendor)}
                  className="flex-1 space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    defaultValue={user?.displayName || ""}
                    {...register("name", { required: true })}
                    className="input w-full"
                  />
                  <input
                    type="text"
                    placeholder="Seller License"
                    {...register("sellerLicense", { required: true })}
                    className="input w-full"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                    className="input w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue={user?.email || ""}
                    {...register("email")}
                    className="input w-full"
                    readOnly
                  />
                  <select
                    {...register("location", { required: true })}
                    className="select w-full"
                  >
                    <option disabled value="">
                      Select Location
                    </option>
                    {locations.map((loc, idx) => (
                      <option key={idx} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("sellerType", { required: true })}
                    className="select w-full"
                  >
                    <option disabled value="">
                      Select Ticket Type
                    </option>
                    {tickets.map((tic, idx) => (
                      <option key={idx} value={tic}>
                        {tic}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="NID"
                    {...register("NID", { required: true })}
                    className="input w-full"
                  />

                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn bg-purple-600 text-white"
                    >
                      Submit
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

                <div className="flex-1">
                  <img src={user?.photoURL} alt="Vendor Application" />
                  <h2 className="my-5 text-3xl font-semibold">
                    Enjoy connecting with us!
                  </h2>
                </div>
              </div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeAVendorModal;

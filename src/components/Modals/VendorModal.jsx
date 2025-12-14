import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VendorModal = ({ vendor, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  if (!vendor) return null;

  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="vendor-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="modal-box relative bg-base-100 text-base-content md:rounded-2xl rounded-xl shadow-2xl"
          >
            <h3 className="font-bold text-2xl text-center text-purple-700 mb-4">
              Rider Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {vendor.name}
              </p>
              <p>
                <strong>Email:</strong> {vendor.email}
              </p>
              <p>
                <strong>Phone:</strong> {vendor.phone}
              </p>
              <p>
                <strong>NID:</strong> {vendor.NID}
              </p>
              <p>
                <strong>Driving License:</strong> {vendor.sellerLicense}
              </p>
              <p>
                <strong>Location:</strong> {vendor.location}
              </p>

              <p>
                <strong>Status:</strong> {vendor.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(vendor.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={onClose}
                className="btn bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
};

export default VendorModal;

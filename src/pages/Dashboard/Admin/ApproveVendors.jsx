import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useState } from "react";

import useSecureAxios from "../../../hooks/useSecureAxios";
import VendorModal from "../../../components/Modals/VendorModal";

const ApproveVendors = () => {
  const axiosSecure = useSecureAxios();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refetch, data: vendors = [] } = useQuery({
    queryKey: ["vendors", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendors");
      return res.data;
    },
  });

  const updateVendorStatus = (vendor, status) => {
    axiosSecure
      .patch(`/vendors/${vendor._id}`, { status, email: vendor.email })
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Vendor status is ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleApproval = (vendor) => updateVendorStatus(vendor, "approved");
  const handleRejection = (vendor) => updateVendorStatus(vendor, "rejected");

  const deleteVendor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This vendor will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/vendors/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Vendor has been removed.",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  const viewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  return (
    <div className="my-10 mx-auto max-w-6xl">
      <h1 className="text-5xl font-bold">
        Vendors Approval pending : {vendors.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={vendor._id}>
                <th>{index + 1}</th>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td
                  className={
                    vendor.status === "approved"
                      ? "text-green-500 bg-green-200"
                      : "text-red-400"
                  }
                >
                  {vendor.status}
                </td>
                <td>{vendor.workStatus}</td>
                <td>
                  {vendor.district}, {vendor.region}
                </td>
                <td>
                  <button onClick={() => viewVendor(vendor)} className="btn">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(vendor)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(vendor)}
                    className="btn mx-2"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => deleteVendor(vendor._id)}
                    className="btn"
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor modal */}
      <VendorModal
        vendor={selectedVendor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApproveVendors;

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuth from "../../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";

const AddTicketForm = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/tickets", payload),
    onSuccess: () => {
      toast.success("Ticket added successfully!");
      mutationReset();
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to add ticket");
    },
  });

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;
    const res = await axios.post(imgbbUrl, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.image && data.image[0]) {
        imageUrl = await handleImageUpload(data.image[0]);
      }

      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departure: data.departure,
        perks: data.perks || [],
        image: imageUrl,
        vendor: {
          name: user.displayName,
          email: user.email,
        },
      };

      await mutateAsync(ticketData);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading ticket");
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center  p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6"
      >
        {/* Ticket Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Ticket Title</label>
          <input
            type="text"
            placeholder="Enter ticket title"
            className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* From & To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">From</label>
            <input
              type="text"
              placeholder="Departure location"
              className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
              {...register("from", { required: "Departure location required" })}
            />
            {errors.from && (
              <p className="text-xs text-red-500 mt-1">{errors.from.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">To</label>
            <input
              type="text"
              placeholder="Arrival location"
              className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
              {...register("to", { required: "Arrival location required" })}
            />
            {errors.to && (
              <p className="text-xs text-red-500 mt-1">{errors.to.message}</p>
            )}
          </div>
        </div>

        {/* Transport Type */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Transport Type</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
            {...register("transportType", {
              required: "Select transport type",
            })}
          >
            <option value="">Select</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
          </select>
          {errors.transportType && (
            <p className="text-xs text-red-500 mt-1">
              {errors.transportType.message}
            </p>
          )}
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Price (per unit)
            </label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
              {...register("price", { required: true, min: 0 })}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Ticket Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
              {...register("quantity", { required: true, min: 1 })}
            />
          </div>
        </div>

        {/* Departure */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">
            Departure Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
            {...register("departure", { required: true })}
          />
        </div>

        {/* Perks */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Perks</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["AC", "Breakfast", "WiFi", "Snacks"].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input type="checkbox" value={perk} {...register("perks")} />
                {perk}
              </label>
            ))}
          </div>
        </div>

        {/* Image upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Ticket Image</label>
          <input
            type="file"
            className="border px-2 py-1 rounded-md"
            {...register("image")}
          />
        </div>

        {/* Vendor Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Vendor Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Vendor Email</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-lime-500 text-white font-semibold rounded-md flex justify-center items-center gap-2"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin" />
          ) : (
            "Add Ticket"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUpdateCarMutation } from "../../redux/features/Cars/CarsManagementApi";

type ICarFormInput = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: string;
  features: string[];
  pricePerHour: number;
};

const UpdateCar = ({ previewsData,onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICarFormInput>({
    defaultValues: previewsData, // Set default values when the form is initialized
  });
  
  const [updateCar] = useUpdateCarMutation();

  // Update form values whenever previewsData changes
  useEffect(() => {
    if (previewsData) {
      reset(previewsData); // Reset the form with new default values
    }
  }, [previewsData, reset]);

  const onSubmit: SubmitHandler<ICarFormInput> = async (data) => {
    try {
      data.pricePerHour = Number(data.pricePerHour); // Ensure price is a number
      console.log(data)
      const res = await updateCar({ id: previewsData._id, data }).unwrap();
      console.log({res})
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully updated the car",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="label-text font-semibold">
          Car Name*
        </label>
        <input
          id="name"
          type="text"
          className="input input-bordered w-full"
          {...register("name", { required: "Car name is required" })}
          defaultValue={previewsData.name} // Default value for the name field
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="label-text font-semibold">
          Description*
        </label>
        <textarea
          id="description"
          className="input input-bordered w-full"
          {...register("description", { required: "Description is required" })}
          defaultValue={previewsData.description} // Default value for the description field
        />
        {errors.description && (
          <p className="text-red-400">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="color" className="label-text font-semibold">
          Color*
        </label>
        <input
          id="color"
          type="text"
          className="input input-bordered w-full"
          {...register("color", { required: "Color is required" })}
          defaultValue={previewsData.color} // Default value for the color field
        />
        {errors.color && <p className="text-red-400">{errors.color.message}</p>}
      </div>

      <div>
        <label htmlFor="isElectric" className="label-text font-semibold">
          Is Electric?
        </label>
        <input
          id="isElectric"
          type="checkbox"
          {...register("isElectric")}
          defaultChecked={previewsData.isElectric} // Default value for the checkbox
        />
      </div>

      <div>
        <label htmlFor="status" className="label-text font-semibold">
          Status*
        </label>
        <select
          id="status"
          className="input input-bordered w-full"
          {...register("status", { required: "Status is required" })}
          defaultValue={previewsData.status} // Default value for the status field
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        {errors.status && (
          <p className="text-red-400">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="features" className="label-text font-semibold">
          Features*
        </label>
        <input
          id="features.0"
          type="text"
          className="input input-bordered w-full"
          {...register("features.0", {
            required: "At least one feature is required",
          })}
          defaultValue={previewsData.features[0]} // Default value for the first feature
        />
        {errors.features?.[0] && (
          <p className="text-red-400">{errors.features[0].message}</p>
        )}
        {/* Add more feature inputs as needed */}
      </div>

      <div>
        <label htmlFor="pricePerHour" className="label-text font-semibold">
          Price Per Hour*
        </label>
        <input
          id="pricePerHour"
          type="number"
          className="input input-bordered w-full"
          {...register("pricePerHour", {
            required: "Price per hour is required",
          })}
          defaultValue={previewsData.pricePerHour} // Default value for the pricePerHour field
        />
        {errors.pricePerHour && (
          <p className="text-red-400">{errors.pricePerHour.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-warning mt-4">
        Update Car
      </button>
    </form>
  );
};

export default UpdateCar;

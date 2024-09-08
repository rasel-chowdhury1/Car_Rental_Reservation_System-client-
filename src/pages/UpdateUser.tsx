import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUpdateProfileMutation } from "../redux/features/auth/authApi";

type IUserFormInput = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role?: string;
    terms?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };

interface UpdateUserProps {
  previewsData: IUserFormInput;
  onClose: () => void;
}

const UpdateUser = ({ previewsData, onClose }: UpdateUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserFormInput>({
    defaultValues: previewsData, // Set default values when the form is initialized
  });

  const [updateProfile] = useUpdateProfileMutation();

  // Update form values whenever previewsData changes
  useEffect(() => {
    if (previewsData) {
      reset(previewsData); // Reset the form with new default values
    }
  }, [previewsData, reset]);

  const onSubmit: SubmitHandler<IUserFormInput> = async (data) => {
    try {
      // Ensure phone is a string (in case you want to sanitize the input)
      await updateProfile({ data }).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully updated the user",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="label-text font-semibold">
          Name*
        </label>
        <input
          id="name"
          type="text"
          className="input input-bordered w-full"
          {...register("name", { required: "Name is required" })}
          defaultValue={previewsData.name} // Default value for the name field
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="label-text font-semibold">
          Phone*
        </label>
        <input
          id="phone"
          type="tel"
          className="input input-bordered w-full"
          {...register("phone", { required: "Phone number is required" })}
          defaultValue={previewsData.phone} // Default value for the phone field
        />
        {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="label-text font-semibold">
          Address*
        </label>
        <textarea
          id="address"
          className="input input-bordered w-full"
          {...register("address", { required: "Address is required" })}
          defaultValue={previewsData.address} // Default value for the address field
        />
        {errors.address && (
          <p className="text-red-400">{errors.address.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-warning mt-4">
        Update User
      </button>
    </form>
  );
};

export default UpdateUser;

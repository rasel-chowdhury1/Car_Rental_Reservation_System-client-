import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCarMutation } from "../../redux/features/Cars/CarsManagementApi";
import Swal from "sweetalert2";

const img_hosting_token = "622e0d92c5c1dfc5ba8cf9cab3a6e860";
type ICarFormInput = {
    name: string;
    model: string;
    photo?: string;
    description: string;
    color: string;
    isElectric: boolean;
    status?: string;
    features: string[];
    pricePerHour: number;
    isDeleted?: boolean;
  }

const CreateCar = () => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<ICarFormInput>();
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [createCar] = useCreateCarMutation();

    
    const onSubmit: SubmitHandler<ICarFormInput> = async (data) => {
      console.log(data);

      try {
        data.pricePerHour = Number(data.pricePerHour);
        const res = await createCar(data).unwrap();
        console.log({res})
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully created a car",
          showConfirmButton: false,
          timer: 1500
        });
        
        reset()
      } catch (error) {
        console.log({error})
      }
    };
  
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('image', file);
  
      setLoading(true);
      setUploadError(null);
  
      try {
        const response = await axios.post(img_hosting_url, formData);
        const imageUrl = response.data.data.url;
        setValue('photo', imageUrl);  // Set the image URL in the form state
      } catch (error) {
        setUploadError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className='container mx-auto'>
        <div className=" bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">Add New Car</h2>
        
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="label-text font-semibold">Car Name*</label>
        <input
          id="name"
          type="text"
          className="input input-bordered w-full "
          {...register('name', { required: 'Car name is required' })}
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="Model" className="label-text font-semibold">Car Model*</label>
        <input
          id="model"
          type="text"
          className="input input-bordered w-full "
          {...register('model', { required: 'Car name is required' })}
        />
        {errors.model && <p className="text-red-400">{errors.model.message}</p>}
      </div>

      <div>
        <label htmlFor="photo" className="label-text font-semibold">Photo*</label>
        <input
          id="photo"
          type="file"
          className=" w-full "
          onChange={handleFileChange}
        />
        {loading && <p>Uploading...</p>}
        {uploadError && <p className="text-red-400">{uploadError}</p>}
      </div>

      <div>
        <label htmlFor="description" className="label-text font-semibold">Description*</label>
        <textarea
          id="description"
          className="input input-bordered w-full "
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="text-red-400">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="color" className="label-text font-semibold">Color*</label>
        <input
          id="color"
          type="text"
          className="input input-bordered w-full "
          {...register('color', { required: 'Color is required' })}
        />
        {errors.color && <p className="text-red-400">{errors.color.message}</p>}
      </div>

      <div>
        <label htmlFor="isElectric" className="label-text font-semibold">Is Electric?</label>
        <input
          id="isElectric"
          type="checkbox"
          {...register('isElectric')}
        />
      </div>

      <div>
        <label htmlFor="status" className="label-text font-semibold">Status*</label>
        <select id="status" {...register('status')} className="input input-bordered w-full ">
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div>
        <label htmlFor="features" className="label-text font-semibold">Features*</label>
        <input
          id="features"
          type="text"
          className="input input-bordered w-full "
          {...register('features.0', { required: 'At least one feature is required' })}
          placeholder="Feature 1"
        />
        {errors.features?.[0] && <p className="text-red-400">{errors.features[0].message}</p>}
        {/* Add more feature inputs as needed */}
      </div>

      <div>
        <label htmlFor="pricePerHour" className="label-text font-semibold">Price Per Hour</label>
        <input
          id="pricePerHour"
          type="number"
          className="input input-bordered w-full "
          {...register('pricePerHour', { required: 'Price per hour is required' })}
        />
        {errors.pricePerHour && <p className="text-red-400">{errors.pricePerHour.message}</p>}
      </div>

      <button type="submit" className='btn btn-warning mt-4'>Submit</button>
    </form>

    </div>
        </div>
    );
};

export default CreateCar;
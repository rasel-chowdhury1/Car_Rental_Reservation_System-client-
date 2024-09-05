// import { TCar } from "../../../types/car.type";
import { TCar } from "../../../types/car.type";
import { TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";
type QueryParam = {
  name: string;
  value: string | number;
};

// type GetAllCarsResponse = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: TCar[];
// };

const CarsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args?: QueryParam[]) => {
        console.log(args);
        const params = new URLSearchParams();
 
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/cars',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['cars'],
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        console.log("get all cars response -> ", response)
        return {
          data: response.data,
        };
      },
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: '/cars',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cars'],
    }),
    updateCar: builder.mutation({
      query: ({id,data}) => ({
        url: `/cars/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['cars'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cars'],
    }),

  }),
});

export const {useGetAllCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation} = CarsManagementApi;
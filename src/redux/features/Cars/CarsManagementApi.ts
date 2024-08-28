import { baseApi } from "../../api/baseApi";

const CarsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
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
      transformResponse: (response) => {
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
  }),
});

export const {useGetAllCarsQuery, useCreateCarMutation} = CarsManagementApi;
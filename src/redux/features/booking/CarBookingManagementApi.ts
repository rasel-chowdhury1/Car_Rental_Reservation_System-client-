import { baseApi } from "../../api/baseApi";

const CarsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myBooking: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/bookings/my-bookings',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['booking'],
      transformResponse: (response) => {
        console.log({response})
        return {
          data: response,
        };
      },
    }),

    singleBooking: builder.query({
        query: (bookingId) => {
          return {
            url: `/bookings/${bookingId}`,
            method: 'GET',
          };
        },
        transformResponse: (response) => {
          return {
            data: response,
          };
        },
      }),

    bookingCar: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking'],
    }),
    returnbookingCar: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['booking'],
    })
  }),
});

export const {useMyBookingQuery, useSingleBookingQuery, useBookingCarMutation, useReturnbookingCarMutation} = CarsManagementApi;
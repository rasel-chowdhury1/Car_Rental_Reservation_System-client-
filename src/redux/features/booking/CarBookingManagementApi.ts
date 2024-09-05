import { TResponseRedux } from "../../../types/global.type";
import { TPayment } from "../../../types/payment.type";
import { baseApi } from "../../api/baseApi";
 type QueryParam = {
  name: string;
  value: string | number;
};
const CarsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myBooking: builder.query({
      query: (args?: QueryParam[]) => {
        // console.log(args);
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
      transformResponse: (response: TResponseRedux<TPayment[]>) => {
        // console.log({response})
        return {
          data: response.data,
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
        transformResponse: (response: TResponseRedux<TPayment>) => {
          // console.log("single booking -> ", response)
          return {
            data: response.data,
          };
        },
      }),

    bookingCar: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking', "cars"],
    }),
    confirmBookingCar: builder.mutation({
      query: (data) => ({
        url: '/bookings/confirm',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['booking', "cars"],
    }),
    returnbookingCar: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['booking'],
    }),
    deleteBookingCar: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['booking'],
    }),
    paymentHistoryByUser: builder.query({
      query: (userId) => {
        return {
          url: `/payment/history/${userId}`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<TPayment[]>) => {
        // console.log("payment history response -> ", response)
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useMyBookingQuery, 
  useSingleBookingQuery, 
  useBookingCarMutation, 
  useReturnbookingCarMutation, 
  useDeleteBookingCarMutation,
  useConfirmBookingCarMutation,
  usePaymentHistoryByUserQuery
} = CarsManagementApi;
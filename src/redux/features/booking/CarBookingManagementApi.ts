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

    allBookings: builder.query({
      query: (args?: QueryParam[]) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/bookings',
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
      invalidatesTags: ['booking', "cars"],
    }),
    paymentbookingCar: builder.mutation({
      query: (data) => ({
        url: 'bookings/pay',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking', "cars"],
    }),
    deleteBookingCar: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['booking', "cars"],
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
    projectSummary: builder.query({
      query: () => {
        return {
          url: `summary`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<{totalBookings: string,
        totalAvailableCars: string,
        totalRevenue: string}>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useMyBookingQuery,
  useAllBookingsQuery,
  useSingleBookingQuery, 
  useBookingCarMutation, 
  useReturnbookingCarMutation, 
  usePaymentbookingCarMutation,
  useDeleteBookingCarMutation,
  useConfirmBookingCarMutation,
  usePaymentHistoryByUserQuery,
  useProjectSummaryQuery
} = CarsManagementApi;
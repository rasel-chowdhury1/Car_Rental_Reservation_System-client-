import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/signin",
                method: "POST",
                body: userInfo
            })
        }),
        signUp: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/signup",
                method: "POST",
                body: userInfo
            }),
            invalidatesTags: ['users'],
        }),
        getAllUsers: builder.query({
            query: (args) => {
              console.log(args);
              const params = new URLSearchParams();
       
              if (args) {
                args.forEach((item) => {
                  params.append(item.name, item.value as string);
                });
              }
              return {
                url: '/auth/users',
                method: 'GET',
                params: params,
              };
            },
            providesTags: ['users'],
            transformResponse: (response) => {
              return {
                data: response.data,
              };
            },
          }),
          updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
              url: `/auth/users/${userId}/role`,
              method: 'PATCH',
              body: { role }, // Send the new role in the request body
            }),
            invalidatesTags: ['users'], // Invalidates the 'Users' tag to refetch the users list after the role is updated
          }),
      

    })
})

export const {useLoginMutation, useSignUpMutation, useGetAllUsersQuery,useUpdateUserRoleMutation } = authApi
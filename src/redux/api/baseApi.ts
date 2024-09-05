import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import Swal from "sweetalert2";


interface ApiError {
  message: string;
  // add other properties if needed
}

const baseQuery = fetchBaseQuery({
    baseUrl: "https://car-rental-reservation-system-phi.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;

        if(token){
            headers.set("authorization", `${token}`)
        }

        return headers;
    }
})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions) : Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    
    if(result?.error?.status === 404){
      const errorData = result?.error.data as ApiError;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (result?.error?.status === 403) {
      const errorData = result?.error.data as ApiError;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 1500
      });
      }
      
    // if(result.error?.status === 401){
    //     console.log("sending refresh token")

    //     const res = await fetch("http://localhost:5000/api", {
    //         method: "POST",
    //         credentials: "include"
    //     })
    //     const data = await res.json();

    //     console.log({data})

    //     if(data?.data?.accessToken){
    //         const user = (api.getState() as RootState).auth.user;
    //         const token = data.data.accessToken;
    //         api.dispatch(
    //             setUser({user, token})
    //         )
    
    //         result = await baseQuery(args, api, extraOptions) 
    //     }
    //     else{
    //         api.dispatch(logout())
    //     }
    // }

    return result
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['cars','booking', 'users'],
    endpoints: () => ({})
})
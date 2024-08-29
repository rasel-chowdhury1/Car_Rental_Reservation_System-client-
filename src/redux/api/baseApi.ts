import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import Swal from "sweetalert2";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
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
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${result.error.data.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (result?.error?.status === 403) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${result.error.data.message}`,
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
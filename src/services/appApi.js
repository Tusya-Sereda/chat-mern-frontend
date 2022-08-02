import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//define a service user a base URL

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chat-mem.herokuapp.com/",
  }),

  endpoints: (builder) => ({
    //creating the user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/register",
        method: "POST",
        body: user,
      }),
    }),

    //login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/login",
        method: "POST",
        body: user,
      }),
    }),

    //logout

    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;

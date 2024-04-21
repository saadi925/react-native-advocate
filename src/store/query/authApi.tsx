// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HOST } from '../../../config/constants'
import { loginData, loginResponse, signupData, SignupResponse } from '../../../types/Responses'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${HOST}/auth` }),
  endpoints: (builder) => ({
    createUser: builder.mutation<SignupResponse, signupData>({
        query : (body) => ({
            url : '/signup',
            method : 'POST',
            body
        }), 
       
       }), 
       loginUser: builder.mutation<loginResponse, loginData>({
        query : (body) => ({
            url : '/signin',
            method : 'POST',
            body
        }),        
       }),
       emailVerify: builder.mutation<{
        token : string, role : 'CLIENT' | 'LAWYER', redirectToProfile : boolean
       }, {code : string , email : string}>({
        query : (body) => ({
            url : `/email_verify_code?email=${body.email}&code=${body.code}`,
            method : 'PUT',
        }),     
           
       }),
  }),
})


export const { useCreateUserMutation, useEmailVerifyMutation, useLoginUserMutation } = authApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '../store';
import { HOST } from '../../../config/constants';

const baseQuery = fetchBaseQuery({ baseUrl : `${HOST}/user/profile`, prepareHeaders });
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'POST',
        body: profileData,
      }),
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
    getUserProfile: builder.query({
      query: () => '/profile',
    }),
    deleteUserProfile: builder.mutation({
      query: () => ({
        url: '/profile',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} = profileApi;
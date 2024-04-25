import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '../middleware';
import { HOST } from '../../../config/constants';
import { profile } from '../../../types/Cards';
import { OtherClientProfile, OtherLawyerProfile } from '../../../types/Responses';

const baseQuery = fetchBaseQuery({ baseUrl : `${HOST}/user`, prepareHeaders });
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
    getUserProfile: builder.query<profile, void>({
      query: () => '/profile',
    }),
    deleteUserProfile: builder.mutation({
      query: () => ({
        url: '/profile',
        method: 'DELETE',
      }),    
    }),
    getOtherClientProfile : builder.query<OtherClientProfile, string>({
      query : (caseId) => `/profile/client/${caseId}`
    }),
    getOtherLawyerProfile : builder.query<OtherLawyerProfile, string>({
      query : (id) => `/profile/lawyer/${id}`
    }),

  }),
});

export const {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,useGetOtherClientProfileQuery, useGetOtherLawyerProfileQuery
} = profileApi;

// lawyerApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from '../../../config/constants';
import { prepareHeaders } from '../middleware';

const baseUrl = `${HOST}/lawyer`;
const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders : prepareHeaders });

export const lawyerApi = createApi({
  reducerPath: 'lawyerApi',
  baseQuery,
  endpoints: (builder) => ({
    createCaseRequest: builder.mutation({
      query: (requestData) => ({
        url: '/case_request',
        method: 'POST',
        body: requestData,
      }),
    }),
    getPendingCaseRequests: builder.query({
      query: () => '/case_request/pending',
    }),
    acceptCaseRequest: builder.mutation({
      query: (requestId) => ({
        url: `/case_request/accept/${requestId}`,
        method: 'PUT',
      }),
    }),
    createOrUpdateLawyerProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'POST',
        body: profileData,
      }),
    }),
    getLawyerProfile: builder.query({
      query: () => '/profile',
    }),
    getCases: builder.query({
      query: () => '/cases',
    }),
    getClients: builder.query({
      query: () => '/clients',
    }),
  }),
});

export const {
  useCreateCaseRequestMutation,
  useGetPendingCaseRequestsQuery,
  useAcceptCaseRequestMutation,
  useCreateOrUpdateLawyerProfileMutation,
  useGetLawyerProfileQuery,
  useGetCasesQuery,
  useGetClientsQuery,
} = lawyerApi;

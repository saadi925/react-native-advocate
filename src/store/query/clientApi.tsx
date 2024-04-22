// clientApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from '../../../config/constants';
import { prepareHeaders } from '../middleware';
import { CaseDataInput } from '../../../types/Cards';

const baseUrl = `${HOST}/client`; 

const baseQuery = fetchBaseQuery({ baseUrl , prepareHeaders : prepareHeaders});

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery,
  endpoints: (builder) => ({
    getCaseByID: builder.query({
      query: (id) => `/case/${id}`,
    }),
    updateCaseStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-case-status/${id}`,
        method: 'PUT',
        body: { status },
      }),
    }),
    createCase: builder.mutation<void , CaseDataInput>({
      query: (caseData) => ({
        url: '/case',
        method: 'POST',
        body: caseData,
      }),
    }),
    updateCase: builder.mutation({
      query: ({ id, caseData }) => ({
        url: `/case/${id}`,
        method: 'PUT',
        body: caseData,
      }),
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/case/${id}`,
        method: 'DELETE',
      }),
    }),
    getCases: builder.query({
      query: () => '/cases',
    }),
    getAllOpenCases: builder.query({
      query: () => '/cases/open',
    }),
    getLawyers: builder.query({
      query: () => '/lawyers',
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: '/review',
        method: 'POST',
        body: reviewData,
      }),
    }),
    updateReview: builder.mutation({
      query: (reviewData) => ({
        url: '/review',
        method: 'PUT',
        body: reviewData,
      }),
    }),
    createCaseRequest: builder.mutation({
      query: (requestData) => ({
        url: '/case_request',
        method: 'POST',
        body: requestData,
      }),
    }),
    acceptCaseRequest: builder.mutation({
      query: (requestId) => ({
        url: `/case_request/accept/${requestId}`,
        method: 'PUT',
      }),
    }),
    getPendingCaseRequests: builder.query({
      query: () => '/case_request/pending',
    }),
    uploadAttachment: builder.mutation({
      query: (attachmentData) => ({
        url: '/attachments',
        method: 'POST',
        body: attachmentData,
      }),
    }),
    getAttachment: builder.query({
      query: (attachmentId) => `/attachments/${attachmentId}`,
    }),
    updateAttachment: builder.mutation({
      query: ({ attachmentId, attachmentData }) => ({
        url: `/attachments/${attachmentId}`,
        method: 'PUT',
        body: attachmentData,
      }),
    }),
    deleteAttachment: builder.mutation({
      query: (attachmentId) => ({
        url: `/attachments/${attachmentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useGetCaseByIDQuery,
  useUpdateCaseStatusMutation,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  useGetCasesQuery,
  useGetAllOpenCasesQuery,
  useGetLawyersQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useCreateCaseRequestMutation,
  useAcceptCaseRequestMutation,
  useGetPendingCaseRequestsQuery,
  useUploadAttachmentMutation,
  useGetAttachmentQuery,
  useUpdateAttachmentMutation,
  useDeleteAttachmentMutation,
} = clientApi;

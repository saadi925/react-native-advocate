// commonApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from '../../../config/constants';
import { prepareHeaders } from '../store';

const baseUrl = `${HOST}/common`; 

const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders : prepareHeaders });

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery,
  endpoints: (builder) => ({
    getCaseStatuses: builder.query({
      query: () => '/case_statuses',
    }),
    getPendingCaseRequests: builder.query({
      query: () => '/case_request/pending',
    }),
    rejectCaseRequest: builder.mutation({
      query: (requestId) => ({
        url: `/case_request/reject/${requestId}`,
        method: 'PUT',
      }),
    }),
    cancelCaseRequest: builder.mutation({
      query: (requestId) => ({
        url: `/case_request/cancel/${requestId}`,
        method: 'PUT',
      }),
    }),
    uploadAttachment: builder.mutation({
      query: ({ caseId, file }) => ({
        url: `/case/${caseId}/attachments`,
        method: 'POST',
        body: file,
      }),
    }),
    downloadAttachment: builder.query({
      query: ({ caseId, filename }) => `/case/${caseId}/attachments/${filename}`,
    }),
    getMessages: builder.query({
      query: () => '/messages',
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useGetCaseStatusesQuery,
  useGetPendingCaseRequestsQuery,
  useRejectCaseRequestMutation,
  useCancelCaseRequestMutation,
  useUploadAttachmentMutation,
  useDownloadAttachmentQuery,
  useGetMessagesQuery,
} = commonApi;

// friendRequestApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from '../../../config/constants';
import { prepareHeaders } from '../store';

const baseUrl = `${HOST}/friend-requests`;

const baseQuery = fetchBaseQuery({ baseUrl , prepareHeaders : prepareHeaders});
export const friendRequestApi = createApi({
  reducerPath: 'friendRequestApi',
  baseQuery,
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation({
      query: ({ caseId }) => ({
        url: `/${caseId}`,
        method: 'POST',
      }),
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `/${requestId}/accept`,
        method: 'PUT',
      }),
    }),
    rejectFriendRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `/${requestId}/reject`,
        method: 'PUT',
      }),
    }),
    getReceivedRequests: builder.query({
      query: () => '/received',
    }),
    getSentRequests: builder.query({
      query: () => '/sent',
    }),
    removeFriend: builder.mutation({
      query: ({ requestId }) => ({
        url: `/friends/${requestId}`,
        method: 'DELETE',
      }),
    }),
    getFriends: builder.query({
      query: () => '/friends',
    }),
  }),
});

export const {
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useGetReceivedRequestsQuery,
  useGetSentRequestsQuery,
  useRemoveFriendMutation,
  useGetFriendsQuery,
} = friendRequestApi;

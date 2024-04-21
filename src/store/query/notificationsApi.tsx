
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from '../../../config/constants';
import { prepareHeaders } from '../store';
const baseUrl = `${HOST}/notifications`;
const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  endpoints: (builder) => ({
    getUnreadNotifications: builder.query({
      query: () => '/unread',
    }),
    getAllNotifications: builder.query({
      query: () => '/',
    }),
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/${notificationId}`,
        method: 'PUT',
      }),
    }),
    removeNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/${notificationId}`,
        method: 'DELETE',
      }),
    }),
    deleteAllUserNotifications: builder.mutation({
      query: () => ({
        url: '/',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUnreadNotificationsQuery,
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useRemoveNotificationMutation,
  useDeleteAllUserNotificationsMutation,
} = notificationApi;

import {  configureStore } from '@reduxjs/toolkit'
import { authApi } from './query/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileApi } from './query/profileApi';
import { notificationApi } from './query/notificationsApi';
import { friendRequestApi } from './query/friendRequestApi';
import { lawyerApi } from './query/lawyerApi';
import { clientApi } from './query/clientApi';
import { commonApi } from './query/commonApi';
import {authSlice} from './slices/authSlice';
export async function prepareHeaders(headers: Headers) {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
}
export const store = configureStore({
  reducer: {
    [authSlice.reducerPath] : authSlice.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [notificationApi.reducerPath] : notificationApi.reducer,
    [friendRequestApi.reducerPath] : friendRequestApi.reducer,
    [lawyerApi.reducerPath] : lawyerApi.reducer,
    [clientApi.reducerPath] : clientApi.reducer,
    [commonApi.reducerPath] : commonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      profileApi.middleware,
      notificationApi.middleware,
      friendRequestApi.middleware,
      lawyerApi.middleware,
      clientApi.middleware,
      commonApi.middleware
    ),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
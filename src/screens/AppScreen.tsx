import { View } from 'native-base'
import React from 'react'
import IoniIcons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../../config/constants';
import LawyerHome from './lawyer/LawyerHome';
import ClientHome from './client/ClientHome';
import RequestListing from '../components/Request/RequestListing';
import NotificationListing from '../components/notifications/NotificationListing';
import MyCaseListing from '../components/client_cases/MyCaseListing';
const Tab = createBottomTabNavigator();


export default function AppScreen() {
  let role = 'CLIENT'
 return      <Tab.Navigator
 screenOptions={({ route }) => ({
   tabBarActiveTintColor: 'tomato',
   tabBarInactiveTintColor: 'gray',
 })}
>
<Tab.Screen name={SCREENS.Home} component={role === "LAWYER" ? LawyerHome : ClientHome } />
<Tab.Screen name={SCREENS.Requests} component={RequestListing} />
<Tab.Screen name={SCREENS.Notifications} component={NotificationListing} />
<Tab.Screen name={SCREENS.Library} component={MyCaseListing} />
</Tab.Navigator>
}

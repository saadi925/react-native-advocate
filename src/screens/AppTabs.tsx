import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../../config/constants';
import RequestListing from '../components/Request/RequestListing';
import NotificationListing from '../components/notifications/NotificationListing';
import MyCaseListing from '../components/client_cases/MyCaseListing';
import {useSelector} from 'react-redux';
import LawyerMyCases from '../components/lawyer_cases/LawyerCaseListing';
import LawyerHome from './lawyer/LawyerHome';
import ClientHome from './client/ClientHome';
import HomeIcon, {NotificationIcon} from '../icons/HomeIcon';
import UsersIcon from '../icons/UsersIcon';
import CaseIcon from '../icons/CaseIcon';
import AppHeader, { ScreenHeader } from '../components/Header';
import { Box, Button } from 'native-base';
const Tab = createBottomTabNavigator();
export default function AppTabs() {
  const role = useSelector((state: any) => state.auth.role);
  return (
    <Tab.Navigator  
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        
      })}>
      <Tab.Screen 
        options={{
          tabBarIcon: HomeIcon,
          header : AppHeader
        }}
        name={SCREENS.Home}
        component={role === 'LAWYER' ? LawyerHome : ClientHome}
      />
      <Tab.Screen
        options={{tabBarIcon: UsersIcon
          ,header : ()=> <ScreenHeader title={'Requests'} />
        }}
        name={SCREENS.Requests}
        component={RequestListing}
      />
      <Tab.Screen
        options={{tabBarIcon: NotificationIcon
          ,header : ()=> <ScreenHeader title={'Notifications'} />
        }}
        name={SCREENS.Notifications}
        component={NotificationListing}
      />
      <Tab.Screen

        options={{
          tabBarIcon: CaseIcon,
          headerTitle : 'My Cases',
          headerStyle :{
          backgroundColor : '#121212',
          borderWidth : 0
          },
          headerTitleStyle : {
            color : 'white'
          },
          headerRight : ()=> <Button mr={2} px={4} rounded={'full'} fontSize={'xl'} colorScheme={'indigo'}>
           Post
          </Button>
        }}
        name={SCREENS.Library}
        component={role === 'LAWYER' ? LawyerMyCases : MyCaseListing}
      />
    </Tab.Navigator>
  );
}

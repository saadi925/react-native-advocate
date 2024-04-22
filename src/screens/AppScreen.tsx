import React from 'react'
import { SCREENS, STACKS } from '../../config/constants';
import { Stack } from '../../App';
import AppTabs from './AppTabs';
import Profile from '../components/profile/Profile';
import LawyerProfileScreen from '../components/profile/LawyerProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export default function AppScreen() {
  const role = useSelector((state : RootState) => state.auth.role);
 return  (
  <Stack.Navigator>
    <Stack.Screen options={{
      headerShown: false
    }} name={STACKS.HomeTabs} component={AppTabs} />
    <Stack.Screen name={SCREENS.Profile} 
    options={{
      headerStyle :{
        backgroundColor : '#121212',
        color : '#fff'
      
      }
      ,headerTitleStyle : {
        color : '#fff'
      },
      
    }}
    component={Profile} />
    {
      role === 'LAWYER' && <Stack.Screen name={SCREENS.LawyerProfile} component={LawyerProfileScreen} />
    }
  </Stack.Navigator>
 )
}

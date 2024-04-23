import React from 'react'
import { COLORS, SCREENS, STACKS } from '../../config/constants';
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
      headerShown: false, presentation : 'modal'
    }} name={STACKS.HomeTabs} component={AppTabs} />
    <Stack.Screen name={SCREENS.Profile} 
    options={{
      headerStyle :{
        backgroundColor : COLORS.main,
        
      }
      ,headerTitleStyle : {
        color : '#fff'
      },
      headerTintColor : COLORS.surface,
      
      
    }}
    component={Profile} />
    {
      role === 'LAWYER' && <Stack.Screen
      options={{
        headerStyle :{
          backgroundColor : COLORS.main,
          
        }
        ,headerTitleStyle : {
          color : '#fff'
        },
        headerTintColor : COLORS.surface,
        
        
      }}
      name={SCREENS.LawyerProfile} component={LawyerProfileScreen} />
    }
  </Stack.Navigator>
 )
}

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, SCREENS } from '../../config/constants';
import SentRequestList from '../components/Request/SentRequestList';
import RecievedFriendRequests from '../components/Request/RequestListing';
import UsersIcon, { AddFriend, UserIcon } from '../icons/UsersIcon';

const Tab = createMaterialTopTabNavigator();

export default function RequestTabs() {
  return (
      <Tab.Navigator
      
       screenOptions={{
        tabBarStyle : {
          backgroundColor : COLORS.main
        },
        tabBarIndicatorStyle : {
          backgroundColor : COLORS.surface
        },
        
        tabBarShowIcon : true,
        tabBarShowLabel : false,
        tabBarIconStyle :{
          width : 24,
          height : 24,
           
        }
       }}
      >
        <Tab.Screen options={{
        tabBarIcon(props) {
          return <UserIcon fill={COLORS.surface} size={32} />
        },
        }}  name={SCREENS.SentRequests} component={SentRequestList} />
        <Tab.Screen 
         options={{
        tabBarIcon(props) {
          return <AddFriend fill={COLORS.surface} size={32} />
        }
         }}
        name={SCREENS.ReceivedRequests} component={RecievedFriendRequests} />
      </Tab.Navigator>
  );
}

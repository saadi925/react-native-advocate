import React, { useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, SCREENS} from '../../config/constants';
import NotificationListing from '../components/notifications/NotificationListing';
import MyCaseListing from '../components/client_cases/MyCaseListing';
import {useSelector} from 'react-redux';
import LawyerMyCases from '../components/lawyer_cases/LawyerCaseListing';
import LawyerHome from './lawyer/LawyerHome';
import ClientHome from './client/ClientHome';
import HomeIcon, {NotificationIcon} from '../icons/HomeIcon';
import  { AddFriend } from '../icons/UsersIcon';
import CaseIcon from '../icons/CaseIcon';
import AppHeader, { ScreenHeader } from '../components/Header';
import {Button, Image, Text, View } from 'native-base';
import RequestTabs from './RequestTabs';
import MockHome from '../../mockData/client/MockHome';
import MockNotifications from '../../mockData/MockNotification';
import MockLawyerHome from '../../mockData/lawyer/MockLawyerHome';
import { RootState } from '../store/store';
const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const mock = false
  const role = useSelector((state: RootState) => state.auth.role);
  console.log("role", role);
  
  return (
    <Tab.Navigator screenOptions={{
        
      tabBarStyle : {
        backgroundColor : '#212134'
        
      },
      tabBarActiveTintColor : COLORS.surface,
      tabBarInactiveTintColor : 'gray',
    }}  >
      <Tab.Screen 
        options={{
          tabBarIcon: HomeIcon,
          header : AppHeader
        }}
        name={SCREENS.Home}
        component={role === 'LAWYER' ? (mock ? MockLawyerHome: LawyerHome) : (mock ? MockHome : ClientHome)}
      />
      <Tab.Screen
        options={{
          tabBarIcon: AddFriend
          ,header : ()=> <ScreenHeader title={'Requests'} />
        }}
        name={SCREENS.Requests}
        component={RequestTabs}
      />
      <Tab.Screen
        options={{tabBarIcon: NotificationIcon
          ,header : ()=> <ScreenHeader title={'Notifications'} />
        }}
        name={SCREENS.Notifications}
        component={mock ?MockNotifications : NotificationListing}
      />
      {
        role === 'LAWYER' ? <Tab.Screen
        options={{tabBarIcon: CaseIcon
          ,header : ()=> <ScreenHeader title={'My Cases'} />
        }}
        name={SCREENS.Library}
        component={LawyerMyCases}
      /> : <Tab.Screen

      options={{
        tabBarIcon: CaseIcon,
        headerTitle : '',
        headerStyle :{
        backgroundColor : COLORS.main,
        borderWidth : 0
        },
        headerLeft(props) {
          return   <View  bg={COLORS.main} flexDirection={'row'} alignItems={'center'}  px={1}>
          <Image source={require('../../src/logo.jpg')} width={10} height={10} alt="logo" rounded={'full'}/>
         <Text   color={'white'} fontSize={'2xl'} px={2} fontWeight={"bold"}>
           Cases
         </Text>
       </View>
        },
        headerTitleStyle : {
          color : 'white'
        },
        headerRight : ()=> <Button 
        mr={2} px={4} rounded={'full'} fontSize={'xl'} colorScheme={COLORS.surface} bg={COLORS.surface}>
    Post
        </Button>
      }}
       name={SCREENS.Library}
        component={MyCaseListingComponent}
      />
      }
    </Tab.Navigator>
  );
}


const MyCaseListingComponent = ({navigation} : any) => {
  const [isCreating, setCreating] = useState(false);
  useEffect(()=>{
    navigation.setOptions({
      headerRight : ()=> <Button 
        onPress={()=> setCreating(!isCreating)}
      mr={2} px={4} rounded={'full'} fontSize={'xl'} colorScheme={COLORS.surface} bg={COLORS.surface}>
     <Text color={COLORS.back}>
        {isCreating ? 'Cancel' : 'Post'}
     </Text>
      </Button>
    })
  },[navigation, isCreating])
  return (
    <MyCaseListing isCreating={isCreating} />
  )
}
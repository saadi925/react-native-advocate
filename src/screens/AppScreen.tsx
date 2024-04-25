import React from 'react'
import { COLORS, SCREENS, STACKS } from '../../config/constants';
import { Stack } from '../../App';
import AppTabs from './AppTabs';
import Profile from '../components/profile/Profile';
import LawyerProfileScreen from '../components/profile/LawyerProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Pressable } from 'react-native';
import { Avatar, HStack, Text } from 'native-base';
import useAuthentication from '../hooks/useAuthentication';
import OtherClientModal from './OtherClientModal';
import UserScreen from '../components/UserScreen';
import Inbox from './Inbox';
import OtherLawyerModal from './OtherLawyerModal';


export default function AppScreen() {
  const {logout} = useAuthentication();
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
      headerRight(props) {
        return (
          <Pressable style={{
            backgroundColor : '#D00000'
            ,padding : 10,
            borderRadius : 50,
          }} onPress={()=>logout()} >
            <Text style={{color : '#fff', fontSize : 18}}>Logout</Text>
          </Pressable>
        )
      },
      
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
    <Stack.Screen options={{
      headerTitle : '',
      headerStyle :{
          backgroundColor : COLORS.main,
          
      },
      headerLeft(){
        return <HStack space={4} alignItems={'center'}>
          <Avatar />
          <Text color={'white'} fontSize={'xl'}>Case</Text>
        </HStack>
      }
    }} name={SCREENS.OtherClientModal} component={OtherClientModal} />
    {/* <Stack.Screen name={SCREENS.Chat} options={{
      headerTitle : 'Active Chats',
      headerStyle :{
          backgroundColor : COLORS.main,
          
      },
      headerTitleStyle : {
        color : '#fff',
      },
      headerTintColor : COLORS.surface,
    
    }} component={UserScreen} /> */}
    <Stack.Screen name={SCREENS.Chat} options={{
      headerTitle : 'Inbox',
      headerStyle :{
          backgroundColor : COLORS.main,
          
      },
      headerTitleStyle : {
        color : '#fff',
      },
      headerLeft(props){
        console.log(props);
        
        return <HStack space={4} alignItems={'center'}>
          <Avatar />
          <Text color={'white'} fontSize={'xl'}>Inbox</Text>
        </HStack>
      }
    
    }} component={Inbox} />
    <Stack.Screen options={{
      headerTitle : '',
      headerStyle :{
          backgroundColor : COLORS.main,
          
      },
      headerTitleStyle : {
        color : '#fff',
      },
      headerLeft(props){
        console.log(props);
        
        return <HStack space={4} alignItems={'center'}>
          <Avatar />
          <Text color={'white'} fontSize={'xl'}>Inbox</Text>
        </HStack>
      },
      headerRight(props){
        return <Pressable style={{
          backgroundColor : COLORS.surface
          ,padding : 10,
          borderRadius : 50,
        
        }}  >
          <Text  style={{color : '#000', fontSize : 18}}>Add User</Text>
        </Pressable>
      }
    
    }} name={SCREENS.OtherLawyerModal} component={OtherLawyerModal} />
  </Stack.Navigator>
 )
}

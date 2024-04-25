import { Avatar, FlatList, HStack, Image, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { COLORS, SCREENS } from '../../config/constants'
import { useGetFriendsQuery } from '../store/query/friendRequestApi'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator, Pressable, TouchableOpacity } from 'react-native'
import { Friend } from '../../types/Cards'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserScreen() {
    const {data , refetch,isLoading, isError, }= useGetFriendsQuery({})
  const {navigate} = useNavigation();
  const [userId , setUserId] = useState(useSelector((state : RootState)=> state.auth?.user?.userId))
  const [isRefreshing, setRefreshing] = useState(false);
 useEffect(()=>{
  AsyncStorage.getItem('userId').then(res=>{
    if (res) {
      setUserId(res)
    }
  })
 },[])
  const handleRefresh = () => {
 
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
    const renderUserItem = ({ item }: { item: Friend }) => {
      return <View mt={4} p={2} borderColor={COLORS.surface} borderWidth={1} rounded={'lg'} bg={"gray.900"}>
      <TouchableOpacity 
           onPress={()=>{
             //   @ts-ignore
            navigate(SCREENS.Inbox, {
              otherUserId : item.otherUserId,
              displayname : item.displayname,
              avatar : item.avatar,
              userId : userId
        })
           }}
           >
           <HStack space={2}  alignItems={'center'} borderColor={COLORS.surface}>
                {item.avatar? <Image source={{uri : item.avatar}} alt={'avatar'} size={10} rounded={100} /> : <Avatar size={10} />}
                <Text fontWeight={'bold'} color={'white'} fontSize={18}>{item.displayname || 'unknown user'}</Text>
            </HStack>
           </TouchableOpacity>

        </View>;
    };

    
  return (
    <View bg={COLORS.main} flex={1}>
      {
        isLoading ? <View flex={1} bg={COLORS.main}>
          <ActivityIndicator />
        </View> : <FlatList style={{
          backgroundColor: COLORS.main,
          padding: 10,

        }}
          data={data}
          renderItem={renderUserItem}
          keyExtractor={(item, index) => index.toString()} // Extract unique key
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
        />
      }
    </View>
  )
}

export function EmptyListComponent() {
    return (
        <View flex={1}>
            <Text color='white'>
                oop's you don't have any friends
            </Text>
        </View>
    )
}









// // [{
//   "content": "Teg",
//    "createdAt": "2024-04-24T10:20:37.346Z", 
//    "id": "70d08669-3854-49bf-8bfb-ca2bceedbc36", 
//    "receiver": [Object], 
//    "receiverId": "b6f82c2c-ef40-4da7-993d-85f6efd864b4", 
//    "seen": false,
//     "senderId": "43cb82fa-dd42-4007-9b18-54de9c399ed6"}]}

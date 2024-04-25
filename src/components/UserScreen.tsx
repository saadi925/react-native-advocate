import { Avatar, FlatList, HStack, Text, View } from 'native-base'
import React, { useState } from 'react'
import { COLORS, SCREENS } from '../../config/constants'
import { useGetFriendsQuery } from '../store/query/friendRequestApi'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator, Pressable } from 'react-native'
import { Friend } from '../../types/Cards'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function UserScreen() {
  const userId = useSelector((state : RootState)=> state.auth.user)
    const {data , refetch,isLoading, isError, }= useGetFriendsQuery({})
  const {navigate} = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
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
        return <View mt={4} p={2} rounded={'lg'} bg={"gray.900"}>
           <Pressable 
           onPress={()=>{
    //   @ts-ignore
            navigate(SCREENS.Inbox, {
                otherUserId : item.otherUserId,
                displayname : item.displayname,
                avatar : item.avatar,
                userId

        })
           }}
           >
           <HStack space={2} alignItems={'center'} borderColor={COLORS.surface}>
                <Avatar size="md" source={{ uri: item?.avatar || undefined }} />
                <Text fontWeight={'bold'} color={'white'} fontSize={18}>{item.displayname || 'unknown user'}</Text>
            </HStack>
           </Pressable>

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
            <Text color='gray.600'>
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

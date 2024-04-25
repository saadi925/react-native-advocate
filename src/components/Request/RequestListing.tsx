import React, {  useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import FriendRequestCard from './RequestCard';
import { Text, View } from 'native-base';
import {  FriendRequest } from '../../../types/Cards';
import { useAcceptFriendRequestMutation, useGetReceivedRequestsQuery, useRejectFriendRequestMutation } from '../../store/query/friendRequestApi';
import { COLORS } from '../../../config/constants';

const RecievedFriendRequests: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const[acceptRequest , {isLoading : accepting , error : acceptError}] = useAcceptFriendRequestMutation()
  const [rejectRequest , {isLoading : rejecting, error : rejectError}] = useRejectFriendRequestMutation()
  const [msg , setMsg] = React.useState<string>('')
  const { data, isLoading, error : fetchingRequestError, refetch, isError } = useGetReceivedRequestsQuery({});
  console.log("data : ", data);
  
  const onAccept = async (id : bigint)=>{
  try {
    const res = await acceptRequest(id).unwrap()
    console.log("success : ", res);
    if ('message' in res && typeof res.message === 'string') {
      setMsg(res.message);
    }
    
  } catch (exception : any) {
    console.log('error while accepting : ', exception);
      if (typeof exception.data.error === 'string') {
        setMsg(exception.data.error);
      }
      
  }
  }
  const onReject =async  (id : bigint)=> {
    try {
      const res = await rejectRequest(id).unwrap()
      console.log("success : ", res);
      
    } catch (exception) {
      console.log('error while rejecting : ', exception);
      
    }
  }
  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
  const renderFriendRequest = ({ item }: { item: FriendRequest }) => {
    return <FriendRequestCard loading={{accepting, rejecting}} onAccept={onAccept} onReject={onReject} item={item} />;
  };

  return (
   <View flex={1} bg={COLORS.main}>
      <Text color={'white'} fontSize={'xl'} p={2} fontWeight={'bold'}>Received Requests</Text>
      <Text color={'white'} fontSize={'xl'}  fontWeight={'bold'}>{msg}</Text>

   {isLoading ? 
  //  loading
 <ActivityIndicator />
  //  after data fetching
    :  <FlatList
      data={data}
      renderItem={renderFriendRequest}
      keyExtractor={(item, index) => index.toString()} 
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} 
    />
    }
   </View>
  );
};

export default RecievedFriendRequests;



export  function EmptyListComponent() {
  return (
      <Text color={'white'}>
         No Incomming Request 
      </Text>
  )
}

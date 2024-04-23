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
  
  const { data, isLoading, error : fetchingRequestError, refetch, isError } = useGetReceivedRequestsQuery({});
  const onAccept = (id : bigint)=>{
  try {
    const res = acceptRequest(id).unwrap()
    console.log("success : ", res);
    
  } catch (exception) {
    console.log('error while accepting : ', exception);
    
  }
  }
  const onReject = (id : bigint)=> {
    try {
      const res = rejectRequest(id).unwrap()
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
console.log(fetchingRequestError);

  return (
   <View flex={1} bg={COLORS.main}>
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

import React, {  useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import FriendRequestCard from './RequestCard';
import { View } from 'native-base';
import {  FriendRequest } from '../../../types/Cards';
import { useGetReceivedRequestsQuery } from '../../store/query/friendRequestApi';

const MyCaseListing: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch, isError } = useGetReceivedRequestsQuery({});
  
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
    return <FriendRequestCard item={item} />;
  };

  return (
   <>
   {isLoading ? 
  //  loading
   <View>
 <ActivityIndicator />
   </View> 
  //  if error
   :  isError ? 
   <View>

   </View> 
  //  after data fetching
    :  <FlatList
      data={data}
      renderItem={renderFriendRequest}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};

export default MyCaseListing;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      
    </View>
  )
}

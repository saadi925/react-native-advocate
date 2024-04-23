import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import { useGetAllNotificationsQuery } from '../../store/query/notificationsApi';
import NotificationCard from './NotificationCard';
import { Notification } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';

const MockNotifications: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch, isError } = useGetAllNotificationsQuery({});
  
  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
  const renderNotificationItem = ({ item }: { item: Notification }) => {
    return <NotificationCard item={item} />;
  };

  return (
   <>
   {isLoading ? 
  //  loadingCase
   <View flex={1} bg={COLORS.main}>
 <ActivityIndicator />
   </View > 
    :  <FlatList style={{
      backgroundColor : COLORS.main,
      padding: 10,
    
    }}
      data={data}
      renderItem={renderNotificationItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};
export default MockNotifications;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='gray.600'>
        No notifications found
      </Text>
    </View>
  )
}

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import NotificationCard from '../src/components/notifications/NotificationCard';
import { COLORS } from '../config/constants';
import { Notification } from '../types/Cards';
import { mockNotifications } from './notifications';

const NotificationListing: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false)
    }, 300);
  };
  const renderNotificationItem = ({ item }: { item: Notification }) => {
    return <NotificationCard item={item} />;
  };
useEffect(()=>{
  setLoading(false)
},[])

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
      data={mockNotifications}
      renderItem={renderNotificationItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};
export default NotificationListing;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='gray.600'>
        No notifications found
      </Text>
    </View>
  )
}

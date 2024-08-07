import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import LawyerItemCard from './ClientCard';
import { LawyerItem, Notification } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';
import { useGetLawyersQuery } from '../../store/query/clientApi';

const ClientHome: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch, isError } = useGetLawyersQuery({});
  
  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
  const renderLawyerItem = ({ item }: { item: LawyerItem }) => {
    return <LawyerItemCard item={item} />;
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
      renderItem={renderLawyerItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};
export default ClientHome;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='white'>
        No lawyers found
      </Text>
    </View>
  )
}

import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import LawyerItemCard from './CaseCard';
import { ClientCaseItem } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';
import { useGetClientsQuery } from '../../store/query/lawyerApi';

const LawyerHome: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch, isError } = useGetClientsQuery({});
  
  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
  const renderLawyerItem = ({ item }: { item: ClientCaseItem }) => {
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
export default LawyerHome;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='white'>
        No cases found
      </Text>
    </View>
  )
}

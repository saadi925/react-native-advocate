import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Text, View } from 'native-base';
import { useGetCasesQuery } from '../../store/query/lawyerApi';
import LawyerCaseCard from './LawyerCaseCard';
import { LawyerCaseItem } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';


//  The cases which the lawyer is currently handling
const LawyerMyCases: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch, isError } = useGetCasesQuery({});
  
  const handleRefresh = () => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error('Error refreshing data:', err);
        setRefreshing(false);
      });
  };
  const renderCaseItem = ({ item }: { item: LawyerCaseItem }) => {
    return <LawyerCaseCard item={item} />;
  };

  return (
   <View flex={1} bg={COLORS.main}>
   {isLoading ? 
  //  loading
   <View>
 <ActivityIndicator />
   </View> 
  //  after data fetching
    :  <FlatList
      data={data}
      renderItem={renderCaseItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </View>
  );
};

export default LawyerMyCases;



export  function EmptyListComponent() {
  return (
    <Text fontSize={20}  p={4} color={'red.500'}>
      No cases found
    </Text>
  )
}

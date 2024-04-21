import React, {  useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useGetCasesQuery } from '../../store/query/clientApi';
import ClientCaseCard from './CaseCard';
import { View } from 'native-base';
import { ClientCaseItem } from '../../../types/Cards';

// the cases which the client has created 
const MyCaseListing: React.FC = () => {
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
  const renderCaseItem = ({ item }: { item: ClientCaseItem }) => {
    return <ClientCaseCard item={item} />;
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
      renderItem={renderCaseItem}
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

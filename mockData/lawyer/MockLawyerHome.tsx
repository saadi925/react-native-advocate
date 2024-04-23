import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import LawyerItemCard from '../../src/screens/lawyer/CaseCard';
import { COLORS } from '../../config/constants';
import { ClientCaseItem } from '../../types/Cards';
import { mockClients } from './clients';

const MockLawyerHome: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 300);
  };
  const renderLawyerItem = ({ item }: { item: ClientCaseItem }) => {
    return <LawyerItemCard item={item} />;
  };
 useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 2000)
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
      data={mockClients}
      renderItem={renderLawyerItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};
export default MockLawyerHome;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='white'>
        No lawyers found
      </Text>
    </View>
  )
}

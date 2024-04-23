import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import LawyerItemCard from '../../src/screens/client/ClientCard';
import { LawyerItem } from '../../types/Cards';
import { mockLawyers } from './lawyers';
import { COLORS } from '../../config/constants';

const MockHome: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  },[])
  const handleRefresh = () => {
    setRefreshing(true);
    
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
      data={mockLawyers}
      renderItem={renderLawyerItem}
      keyExtractor={(item, index) => index.toString()} // Extract unique key
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListEmptyComponent={() => <EmptyListComponent />} // Display if no data
    />
    }
   </>
  );
};
export default MockHome;



export  function EmptyListComponent() {
  return (
    <View flex={1}>
      <Text color='white'>
        No lawyers found
      </Text>
    </View>
  )
}

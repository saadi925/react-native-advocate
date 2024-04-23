import React from 'react';
import {   ActivityIndicator, FlatList, RefreshControl, Button } from 'react-native';
import { useCancelFriendRequestMutation, useGetSentRequestsQuery } from '../../store/query/friendRequestApi';
import { SentFriendRequest } from '../../../types/Cards';
import SentRequestsCard from './SentRequestsCard';
import { View,Text } from 'native-base';
import { COLORS } from '../../../config/constants';

const SentRequestList: React.FC = () => {
  const { data, refetch, isLoading: gettingRequests, isError , error : fetchingRequestError} = useGetSentRequestsQuery({});
  const [cancelRequest, { isLoading: cancelling, error }] = useCancelFriendRequestMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelRequest(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  };

  const renderSentRequest = ({ item }: { item: SentFriendRequest }) => {
    return <SentRequestsCard item={item} onCancel={handleCancel} cancelError={error} cancelling={cancelling} />
  };
console.log(fetchingRequestError);

  return (
    <View flex={1} bg={COLORS.main}>
      {gettingRequests ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={renderSentRequest}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={gettingRequests} onRefresh={refetch} />}
          ListEmptyComponent={() => <Text color={'white'}>No outgoing requests</Text>}
        />
      )}
    </View>
  );
};

export default SentRequestList;

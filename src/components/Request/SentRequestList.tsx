import React from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl, Button } from 'react-native';
import { useCancelFriendRequestMutation, useGetSentRequestsQuery } from '../../store/query/friendRequestApi';
import { SentFriendRequest } from '../../../types/Cards';
import SentRequestsCard from './SentRequestsCard';

const SentRequestList: React.FC = () => {
  const { data, refetch, isLoading: gettingRequests, isError } = useGetSentRequestsQuery({});
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

  return (
    <View>
      {gettingRequests ? (
        <ActivityIndicator />
      ) : isError ? (
        <Text>Error fetching sent requests</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderSentRequest}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={gettingRequests} onRefresh={refetch} />}
          ListEmptyComponent={() => <Text>No outgoing requests</Text>}
        />
      )}
    </View>
  );
};

export default SentRequestList;

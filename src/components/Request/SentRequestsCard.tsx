import React from 'react';
import { View, Text, Avatar, Button, Spinner } from 'native-base';
import { SentFriendRequest } from '../../../types/Cards';
import { formatDate } from '../helpers';

interface SentRequestsCardProps {
  item: SentFriendRequest;
  onCancel: (id: string) => void;
  cancelling: boolean;
  cancelError: any;
}

const SentRequestsCard: React.FC<SentRequestsCardProps> = ({
  item,
  onCancel,
  cancelling,
  cancelError,
}) => {
  const { receiver, createdAt } = item;
  const displayname = receiver?.profile?.displayname || 'Unknown user';
  const avatar = receiver?.profile?.avatar;
  const timeAgo = formatDate(createdAt);

  const handleCancel = () => {
    onCancel(item.id);
  };

  return (
    <View p={4} borderWidth={1} borderRadius={8} borderColor="gray.200" mb={4}>
      <View flexDirection="row" alignItems="center">
        {avatar ? <Avatar source={{ uri: avatar }} size="md" /> : <Avatar size="md" />}
        <Text ml={3} fontWeight="bold">
          {displayname}
        </Text>
      </View>
      <Text mt={2}>Sent : {timeAgo}</Text>
      <View flexDirection="row" justifyContent="flex-end" mt={4}>
        <Button onPress={handleCancel} colorScheme="error" isLoading={cancelling}>
          {cancelling ? <Spinner color="white" size="sm" /> : <Text>Cancel </Text>}
        </Button>
      </View>
      {cancelError && <Text mt={2} color="red.500">Error cancelling request</Text>}
    </View>
  );
};

export default SentRequestsCard;

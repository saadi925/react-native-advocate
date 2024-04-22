import { Avatar, Button, Flex, HStack, Text, View } from 'native-base';
import React from 'react';
import { FriendRequest } from '../../../types/Cards';
import { formatDate } from '../helpers';

interface Props {
  item: FriendRequest;
  onReject: (id: bigint) => void;
  onAccept: (id: bigint) => void;
  loading :{
    accepting : boolean
    rejecting : boolean
  }
}

const RequestCard: React.FC<Props> = ({ item, onAccept, onReject, loading }) => {
  const { id, sender, createdAt } = item;
  const displayname = sender.profile?.displayname || 'Unknown User';
  const avatar = sender.profile?.avatar;
  const timeAgo = formatDate(createdAt);

  const handleReject = () => {
    onReject(id);
  };

  const handleAccept = () => {
    onAccept(id);
  };

  return (
    <View borderWidth={1} borderColor="gray.200" borderRadius={8} p={4} mb={4}>
      <HStack alignItems="center">
        <Avatar source={avatar ? { uri: avatar } : undefined} size="md" />
        <Text ml={3} fontWeight="bold">
          {displayname}
        </Text>
      </HStack>
      <Text mt={2} color="gray.500">
        {timeAgo}
      </Text>
      <Flex direction="row" justifyContent="space-between" mt={4}>
        <Button disabled={loading.accepting || loading.rejecting} flex={1} mr={2} onPress={handleReject} colorScheme="gray">
          Reject
        </Button>
        <Button disabled={loading.rejecting || loading.accepting} flex={1} ml={2} onPress={handleAccept} colorScheme="blue">
          Accept
        </Button>
      </Flex>
    </View>
  );
};

export default RequestCard;

import React from 'react';
import { View, Text, Avatar, Button, Spinner, HStack } from 'native-base';
import { SentFriendRequest } from '../../../types/Cards';
import { formatDate } from '../helpers';
import { COLORS } from '../../../config/constants';

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
    <View mt={2} bg={'white'} bgColor={'gray.700'} p={2}  borderRadius={8} borderColor="gray.200" mb={4}>
      <HStack flexDirection="row" alignItems="center">
        {avatar ? <Avatar source={{ uri: avatar }} size="md" /> : <Avatar size="md" />}
        <Text color={'white'} fontSize={'lg'} ml={2} fontWeight="bold">
          {displayname}
        </Text>
      </HStack>
      <View flexDirection="row" justifyContent={'space-between'} >
        <Text bg={COLORS.main} color={'white'} px={4} py={1} rounded={'full'} fontSize={'lg'} mt={1}>
        sent {timeAgo}
        </Text>
        <Button onPress={handleCancel} colorScheme="error" rounded={'full'} isLoading={cancelling}>
          {cancelling ? <Spinner color="white" size="sm" /> : <Text color={'white'}>Cancel </Text>}
        </Button>
      </View>
      {cancelError && <Text mt={1} color="red.500">Error cancelling request</Text>}
    </View>
  );
};

export default SentRequestsCard;

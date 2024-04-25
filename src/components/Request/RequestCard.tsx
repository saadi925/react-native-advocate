import { Avatar, Box, Button, Flex, HStack, Text, View } from 'native-base';
import React from 'react';
import { FriendRequest } from '../../../types/Cards';
import { formatDate } from '../helpers';
import { COLORS } from '../../../config/constants';

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
  const { id, sender, createdAt , status} = item;
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
   <>
   {status === "PENDING" &&  <View mt={2} bg={'white'} bgColor={'gray.700'} p={2}  borderRadius={8} borderColor="gray.200" mb={4}>
      <HStack justifyContent={'space-between'} alignItems="center">
       <HStack alignItems={'center'}>
       <Avatar source={avatar ? { uri: avatar } : undefined} size="md" />
        <Text color={'white'} fontSize={'lg'} ml={2} fontWeight="bold">
          {displayname}
        </Text>
       </HStack>
      <Text color={'white'} fontSize={'lg'} mt={1}>
         {timeAgo}
        </Text>
      </HStack>
      <Flex direction="row" mt={1} justifyContent="space-between" >
        <Button rounded={'full'} disabled={loading.accepting || loading.rejecting} flex={1} mr={2} onPress={handleReject} bg={'red.700'} colorScheme="gray">
          Reject
        </Button>
        <Button disabled={loading.rejecting || loading.accepting} flex={1} ml={2} onPress={handleAccept} rounded={'full'} colorScheme={'green'} bg={COLORS.surface}>
         <Text color={'black'}>
         Accept
         </Text>
        </Button>
      </Flex>
    </View>}
   </>
  );
};

export default RequestCard;

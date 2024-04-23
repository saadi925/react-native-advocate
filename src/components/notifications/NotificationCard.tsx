import React from 'react';
import { Box, Text, Image, Flex, Spacer, HStack, Avatar, Badge } from 'native-base';
import { Notification } from '../../../types/Cards';
import { COLORS } from '../../../config/constants';
import { formatDate } from '../helpers';

type NotificationCardProps = {
    item: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ item }) => {
    const { id, message, read, avatarUrl, name , createdAt} = item;
  const timeAgo = formatDate(createdAt);
    return (
        <Box
           bg={'rgba(18, 18, 18, 0.5)'}
            // p={4}
            mb={4}
            py={2}
            borderRadius={8}
            shadow={2}
        >
            <HStack  space={3} alignItems={'center'}>
                    <Avatar size="md" source={{ uri: avatarUrl || undefined }} />
                <Flex flex={1}>
                    {name && (
                        <Text fontSize={'lg'} color={'white'} fontWeight="bold">{name}</Text>
                    )}
                    <Text fontSize={'md'} color={"#fff"}>{message}</Text>
                </Flex>
                {!read && (
                    <Badge  rounded={'full'} position={'absolute'} top={0} right={2} bg={COLORS.surface} variant="solid" alignSelf="center">
                        <Text>
                        New
                        </Text>
                    </Badge>
                )}
            </HStack>
            <Text fontSize={'sm'} color={"#fff"} textAlign={'right'}>{timeAgo}</Text>
        </Box>
    );
  }
export default NotificationCard;
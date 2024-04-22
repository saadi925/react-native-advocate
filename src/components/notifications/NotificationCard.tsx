import React from 'react';
import { Box, Text, Image, Flex, Spacer, HStack, Avatar, Badge } from 'native-base';
import { Notification } from '../../../types/Cards';

type NotificationCardProps = {
    item: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ item }) => {
    const { id, message, read, avatarUrl, name } = item;

    return (
        <Box
            bg="white"
            p={4}
            mb={4}
            borderRadius={8}
            shadow={2}
        >
            <HStack space={4}>
                {avatarUrl && (
                    <Avatar size="md" source={{ uri: avatarUrl }} />
                )}
                <Flex flex={1}>
                    {name && (
                        <Text fontWeight="bold">{name}</Text>
                    )}
                    <Text>{message}</Text>
                </Flex>
                {!read && (
                    <Badge colorScheme="info" variant="solid" alignSelf="center">
                        New
                    </Badge>
                )}
            </HStack>
        </Box>
    );
  }
export default NotificationCard;
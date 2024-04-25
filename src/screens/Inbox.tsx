import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, Box, HStack, IconButton, Text, View, VStack } from 'native-base'
import { COLORS, HOST } from '../../config/constants';
import { GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';
import { useGetMessagesQuery } from '../store/query/commonApi';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';
import { formatDate } from '../components/helpers';
import SendIcon from '../chat/icon/Send';
// Define the structure of a message sent from the frontend to the backend
export interface SendMessageData {
  receiverId: string;
  content: string;
  type?: string;
}
export type MessageResponse = {
  id: string;
  content: string;
  createdAt: string;
  type: string;
  receiverId: string;
  user: {
    _id: string;
    avatar: string | null | undefined;
    name: string | null | undefined;
  };
}
export interface MarkMessageAsSeenData {
  messageId: string;
}
const mockData = {
  id: '1',
  displayname: 'John Doe',
  avatar: 'https://placeimg.com/140/140/any',
  otherUserId: '2',
  userId: '1',
};

export default function Inbox({ route, navigation }: any) {
  const { id, displayname, avatar, otherUserId: receiverId, userId } = mockData;
  const [socket, setSocket] = useState<Socket | null>(null);

  // const { data, isLoading, error, refetch } = useGetMessagesQuery({}); // Add refetch function
  const [messageInput, setMessageInput] = useState('');

  const [messages, setMessages] = useState<MessageResponse[]>([]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.main,

      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft(props: any) {

        return <HStack space={4} alignItems={'center'}>
          <Avatar source={{
            uri: avatar || undefined
          }} />
          <Text color={'white'} fontSize={'xl'}>{
            displayname || 'Inbox'}</Text>
        </HStack>
      }
    })
  }, [navigation])
  useEffect(() => {
    const establishConnection = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const newSocket = io(HOST, {
            auth: { token },
          });
          newSocket.on('connect', () => {
            console.log("connected");

          });

         
          newSocket.on('message', (message: MessageResponse) => {
            console.log("new message", message);

            setMessages(prevMessages => [...prevMessages, message]);

          });
          setSocket(newSocket);
        }
      } catch (error) {
        console.error('Error establishing connection:', error);
      }
    };
    establishConnection();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);



  const renderMessage = ({ item }: { item: MessageResponse }) => {
    // console.log("item in render message",item);
    const formatted = formatDate(item.createdAt)
    return (
      <View style={{ paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
        <HStack>
          <Avatar source={{ uri: item.user.avatar || undefined }} />
          <VStack pl={2}>
            <Text fontSize={20} color={'white'}>
              {item.user?.name || 'Unknown user'}
            </Text>
            <Text fontSize={18} color={'white'} bg={'gray.600'} rounded={'lg'} px={2} py={1} >
              {item.content}
            </Text>
            <Text fontSize={12} color={'gray'}>
              {formatDate(item.createdAt)}
            </Text>
          </VStack>
        </HStack>
      </View>
    );

  }
  const sendMessage = async () => {
    try {
      const sendMessageData: SendMessageData = {
        receiverId,
        content: messageInput,
      };
      if (socket) {
        socket.emit('sendMessage', sendMessageData);

        setMessageInput(''); // Clear input after sending
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
      //  inverted
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          value={messageInput}
          onChangeText={text => setMessageInput(text)}
          placeholder="Type a message..."
          style={{ flex: 1, backgroundColor: '#fff', color: '#000', borderRadius: 20, paddingHorizontal: 15 }}
        />
        <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10, backgroundColor: COLORS.main, padding: 10, borderRadius: 20 }}>
        <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}



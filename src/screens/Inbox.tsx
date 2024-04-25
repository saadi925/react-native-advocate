import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { Bubble, GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { io } from 'socket.io-client';
import { COLORS, HOST } from '../../config/constants';
import BottomIcon, { SendIcon } from '../chat/icon/Send';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
}

const socket = io(HOST, {
  auth(cb) {
    getToken().then(token => cb({ token }));
  },
});

export default function Inbox({ route, navigation } : any) {
  const { displayname, avatar, otherUserId: receiverId, userId } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: displayname || 'Advoco User',
      headerStyle: {
        backgroundColor: COLORS.main,
        borderBottomWidth: 1,
        borderColor: '#fff',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    });
  }, [navigation, displayname]);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${HOST}/common/messages`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const body = await response.json();
      if (Array.isArray(body) && body.length > 0) {
        const formattedMessages = body.map((msg: any) => ({
          _id: msg._id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.user._id,
            avatar: msg.user.avatar,
            name: msg.user.name,
          },
        }));
        setMessages(formattedMessages.reverse()); // Reverse to display newest messages at the bottom
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    const messageData = {
      receiverId,
      content: newMessages[0].text,
    };
    if (socket) {
      socket.emit('sendMessage', messageData);
    }
  }, [receiverId]);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2e64e5',
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
      }}
    />
  );

  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={{ flexDirection: 'row' }}>
        <SendIcon />
      </View>
    </Send>
  );

  const scrollToBottomComponent = () => (
    <View>
      <BottomIcon />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: userId }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        showUserAvatar
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
}

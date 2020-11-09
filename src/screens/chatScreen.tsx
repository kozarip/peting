import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { setHasNotification } from '../store/action';
import { updateMatch } from '../services/match';
import Chat from '../services/chat';
import PetingHeader from '../components/petingHeader';
import { colors, fonts } from '../assets/styles/variables';

const ChatScreen = ({ route, navigation }) => {
  const {
    id,
    name,
    userId,
    friendId,
    avatar,
    timestamp,
    lastNewMessageSender,
  } = route.params;
  const [messages, setMessages] = useState([]);
  let baseMessageData = {};
  const { user } = useSelector((state) => state);
  const chat = new Chat();
  const dispatch = useDispatch();

  const me = {
    _id: userId,
    name: user.cognitoUserName,
  };

  const friend = {
    _id: friendId,
    name,
    avatar,
  };

  useEffect(() => {
    // console.log({ name, userId, friendId, avatar, date: new Date() })
    chat.getGivenChat(userId, friendId).then((apiObject) => {
      baseMessageData = {
        id: apiObject.data.searchChats.items[0].id,
        user1: apiObject.data.searchChats.items[0].user1,
        user2: apiObject.data.searchChats.items[0].user2,
      };
      createGiftedMessageObject(apiObject.data.searchChats.items[0].messages);
      chat.subscriptionChat(apiObject.data.searchChats.items[0].id, createGiftedMessageObject);
    });
    if (lastNewMessageSender === friendId) {
      updateMatch(createMatchObj(false));
    }
  }, []);

  const createGiftedMessageObject = (rawMessages: []) => {
    if (rawMessages) {
      const messagesFromAPi: [] = rawMessages.map((message) => addUserObjToMessage(message));
      messagesFromAPi.sort((a, b) => compareMessageDates(a, b));
      setMessages(messagesFromAPi);
/*       if (messagesFromAPi[messagesFromAPi.length - 1].messagesOwner !== userId) {
        dispatch(setHasNotification(false));
      } */
    }
  };

  const compareMessageDates = (a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  };

  const addUserObjToMessage = (message) => {
    // eslint-disable-next-line no-param-reassign
    message.user = message.messagesOwner === userId ? me : friend;
    return message;
  };

  const onSend = useCallback((messagesFromGiftedChat = []) => {
    setMessages((previousMessages) => {
      saveToApi([...previousMessages, messagesFromGiftedChat[0]]);
      updateMatch(createMatchObj(true));
      return GiftedChat.append(previousMessages, messagesFromGiftedChat);
    });
  }, []);

  const saveToApi = (allMessages) => {
    const messagesToApi = allMessages.map(({ user, ...keepAttrs }) => {
      // eslint-disable-next-line no-param-reassign
      if (typeof keepAttrs.messagesOwner === 'undefined') {
        keepAttrs.messagesOwner = user._id === userId ? userId : friendId;
      }
      return keepAttrs;
    });
    const objToApi = { ...baseMessageData, ...{ messages: messagesToApi } };
    chat.updateChat(objToApi);
  };

  const createMatchObj = (withNewMessage: boolean) => {
    return {
      id,
      user1: userId,
      user2: friendId,
      timestamp,
      lastNewMessageSender: withNewMessage ? userId : '',
    };
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ddd' }}>
      <PetingHeader
        navigation={navigation}
      />
      <Text style={styles.chatHeader}>Chat vele: {name}</Text>
      <GiftedChat
        messages={messages}
        onSend={(messagesFromGiftedChat) => onSend(messagesFromGiftedChat)}
        user={{
          _id: userId,
          name: user.cognitoUsername,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: colors.primary,
    fontSize: fonts.heading3,
    color: '#fff',
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default ChatScreen;

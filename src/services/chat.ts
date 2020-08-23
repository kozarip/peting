/* eslint-disable class-methods-use-this */
import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { sendNotificationImmediately } from './notification';

class Chat {
  async getGivenChat(userId, userId2) {
    const filter = {
      or: [
        {
          and: [
            { user1: { eq: userId2 } },
            { user2: { eq: userId } },
          ],
        },
        {
          and: [
            { user1: { eq: userId } },
            { user2: { eq: userId2 } },
          ],
        },
      ],
    };
    // eslint-disable-next-line no-return-await
    return await API.graphql(graphqlOperation(queries.searchChats, { filter }));
  }

  async getMyChats(userId) {
    const filter = {
      or: [
        { user1: { eq: userId } },
        { user2: { eq: userId } },
      ],
    };
    // eslint-disable-next-line no-return-await
    return await API.graphql(graphqlOperation(queries.searchChats, { filter }));
  }

  async createNewChat(chat) {
    API.graphql(graphqlOperation(mutations.createChat, { input: chat }));
  }

  async updateChat(chat) {
    API.graphql(graphqlOperation(mutations.updateChat, { input: chat }));
  }

  async subscriptionChat(chatId, setNewChat = false) {
    const subscription = await API.graphql(
      graphqlOperation(subscriptions.subscribeToGivenChat, { id: chatId }),
    ).subscribe({
      next: (messages) => {
        if (typeof setNewChat === 'function' && messages.value.data.subscribeToGivenChat.messages) {
          sendNotificationImmediately('Hi', 'You have a new message '+ chatId);
          return setNewChat(messages.value.data.subscribeToGivenChat.messages);
        } else {
        }
        return false;
      },
    });
    return subscription;
  }
}

export default Chat;

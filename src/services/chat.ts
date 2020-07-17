/* eslint-disable class-methods-use-this */
import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

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

  async createNewChat(chat) {
    API.graphql(graphqlOperation(mutations.createChat, { input: chat }));
  }

  async updateChat(chat) {
    API.graphql(graphqlOperation(mutations.updateChat, { input: chat }));
  }

  async subscriptionChat(chatId) {
    /* const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateChat)
    ).subscribe({
      next: (todoData) => console.log(todoData),
    }); */
  }
}

export default Chat;

import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

const saveNewMatch = (match) => {
  API.graphql(graphqlOperation(mutations.createMatches, { input: match }));
};

const getUserMatches = async (userId) => {
  const filter = {
    or: [
      { user1: { eq: userId } },
      { user2: { eq: userId } },
    ],
  };
  // eslint-disable-next-line no-return-await
  return await API.graphql(graphqlOperation(queries.searchMatchess, { filter }));
};

const selectTheOtherProfileId = (match, cognitoUserName) => {
  return match.user1 === cognitoUserName ? match.user2 : match.user1;
};

const updateMatch = (match) => {
  API.graphql(graphqlOperation(mutations.updateMatches, { input: match }));
};

const subscriptionMatch = async (match: matchType, setNewMatch) => {
  const subscription = await API.graphql(
    graphqlOperation(subscriptions.subscribeToUserMatches, { id: match.id }),
  ).subscribe({
    next: (messages) => {
      if (typeof setNewMatch === 'function' && messages.value.data.subscribeToUserMatches) {
        console.log(messages.value.data.subscribeToUserMatches);
        match.lastNewMessageSender = messages.value.data.subscribeToUserMatches.lastNewMessageSender;
        return setNewMatch([match]);
      }
      return false;
    },
  });
  return subscription;
};

export {
  saveNewMatch,
  getUserMatches,
  selectTheOtherProfileId,
  updateMatch,
  subscriptionMatch,
};

import { Platform } from 'react-native';
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

const removeMatch = (matchId) => {
  API.graphql(graphqlOperation(mutations.deleteMatches, { input: { id: matchId } }));
};

const subscriptionMatch = async (match: matchType, changeGlobalStateMatch) => {
  const subscription = await API.graphql(
    graphqlOperation(subscriptions.subscribeToUserMatches, { id: match.id }),
  ).subscribe({
    next: (matches) => {
      if (typeof changeGlobalStateMatch === 'function'
      && matches.value.data.subscribeToUserMatches
      && match.lastNewMessageSender !== matches.value.data.subscribeToUserMatches.lastNewMessageSender) {
        match.lastNewMessageSender = matches.value.data.subscribeToUserMatches.lastNewMessageSender;
        return changeGlobalStateMatch([match]);
      }
      return false;
    },
  });
  return subscription;
};

const subscriptionMyMatch = async (id: string) => {
  const subscription = await API.graphql(
    graphqlOperation(subscriptions.subscribeToMyMatches, { id: id }),
  ).subscribe({
    next: (messages) => {
      if (typeof changeGlobalStateMatch === 'function'
      && messages.value.data.subscribeToUserMatches
    },
  });
  return subscription;
};

const setGlobalMatches = (user, cognitoUserName, setMatchToGlobalState, navigation?, navigationReset?) => {
  const globalMatches: matchType[] = [];
  getUserMatches(cognitoUserName).then(async (rawMatches) => {
    const matches = rawMatches.data.searchMatchess.items;
    if (matches) {
      const matchPromises = await matches.map((match) => {
        return user.getUserByCognitoUserName(selectTheOtherProfileId(match, cognitoUserName));
      });
      console.log(matches);
      Promise.all(matchPromises).then((resolved) => {
        resolved.forEach((fullUser: any, i) => {
          const fullUserData = fullUser.data.userByCognitoUserName.items[0];
          const matchData: matchType = {
            id: matches[i].id,
            cognitoUserName: fullUserData.cognitoUserName,
            name: fullUserData.userName,
            avatar_url: fullUserData.images[fullUserData.primaryImageIndex],
            subtitle: matches[i].timestamp.split('T', 1).join(''),
            lastNewMessageSender: matches[i].lastNewMessageSender,
          };
          globalMatches.push(matchData);
        });
        setMatchToGlobalState(globalMatches);
        if (navigation) {
          navigation.navigate('Result');
          if (Platform.OS === 'android') {
            if (typeof navigationReset === 'function') {
              navigationReset('Result', {});
            }
          }
        }
      });
    }
  });
};

export {
  saveNewMatch,
  getUserMatches,
  removeMatch,
  selectTheOtherProfileId,
  updateMatch,
  subscriptionMatch,
  setGlobalMatches,
};

import { Platform, Alert } from 'react-native';
import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import User from './user';

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
      && matches.value.data.subscribeToUserMatches) {
        match.lastNewMessageSender = matches.value.data.subscribeToUserMatches.lastNewMessageSender;
        return changeGlobalStateMatch(match);
      }
      return false;
    },
  });
  return subscription;
};

const subscriptionRemoveMatch = async (match: matchType, removeFromGlobalStateMatch) => {
  const subscription = await API.graphql(
    graphqlOperation(subscriptions.subscribeToRemoveUserMatches, { id: match.id }),
  ).subscribe({
    next: (matches) => {
      if (typeof removeFromGlobalStateMatch === 'function'
      && matches.value.data.subscribeToRemoveUserMatches) {
        return removeFromGlobalStateMatch(match.id);
      }
      return false;
    },
  });
  return subscription;
};

const subscriptionMyFutureMatches = async (cognitoUserName, updateGlobalMatch) => {
  const subscription = await API.graphql(
    graphqlOperation(subscriptions.subscribeToMyMatchesByUser2, { user2: cognitoUserName }),
  ).subscribe({
    next: (matches) => {
      const user = new User();
      const match = matches.value.data.subscribeToMyMatchesByUser2;
      user.getUserByCognitoUserName(match.user1).then((fullUser) => {
        const fullUserData = fullUser.data.userByCognitoUserName.items[0];
        updateGlobalMatch(createMatchData(match, fullUserData));
      });
    },
  });
  return subscription;
};

const setGlobalMatches = (
  user,
  cognitoUserName,
  setMatchToGlobalState,
  setNotificationForTrue,
  navigation?,
  navigationReset?,
) => {
  const globalMatches: matchType[] = [];
  getUserMatches(cognitoUserName).then(async (rawMatches) => {
    const matches = rawMatches.data.searchMatchess.items;
    if (matches) {
      const matchPromises = await matches.map((match) => {
        return user.getUserByCognitoUserName(selectTheOtherProfileId(match, cognitoUserName));
      });
      Promise.all(matchPromises).then((resolved) => {
        resolved.forEach((fullUser: any, i) => {
          const fullUserData = fullUser.data.userByCognitoUserName.items[0];
          if (fullUserData) {
            globalMatches.push(createMatchData(matches[i], fullUserData));
            if (matches[i].lastNewMessageSender
              && (matches[i].lastNewMessageSender !== cognitoUserName
                || (matches[i].lastNewMessageSender === 'new' && matches[i].user2 === cognitoUserName))
            ) {
              setNotificationForTrue(true);
            }
          }
        });
        setMatchToGlobalState(globalMatches);
        if (navigation) {
          navigation.navigate('Result');
          if (Platform.OS === 'android') {
            if (typeof navigationReset === 'function') {
              navigationReset('Result', {});
            }
          }
        } else {
          Alert.alert('There has been a problem with the match id downloading');
        }
      });
    } else {
      navigation.navigate('Result');
      if (Platform.OS === 'android') {
        if (typeof navigationReset === 'function') {
          navigationReset('Result', {});
        }
      }
    }
  });
};

const createMatchData = (match, fullUserData) => {
  return {
    id: match.id,
    cognitoUserName: fullUserData.cognitoUserName,
    name: fullUserData.userName,
    avatar_url: fullUserData.images[fullUserData.primaryImageIndex],
    subtitle: match.timestamp.split('T', 1).join(''),
    lastNewMessageSender: match.lastNewMessageSender,
  };
};

export {
  saveNewMatch,
  getUserMatches,
  removeMatch,
  selectTheOtherProfileId,
  updateMatch,
  subscriptionMatch,
  setGlobalMatches,
  subscriptionMyFutureMatches,
  subscriptionRemoveMatch,
};

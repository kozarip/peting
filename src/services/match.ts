import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

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

export { saveNewMatch, getUserMatches, selectTheOtherProfileId };

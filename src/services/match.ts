import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const saveMatch = (match) => {
  API.graphql(graphqlOperation(mutations.createMatches, { input: match }));
};

export { saveMatch };

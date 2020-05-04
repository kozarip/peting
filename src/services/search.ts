/* tslint:disable */
/* eslint-disable */

import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
class Search {

  async search() {
    return await API.graphql(graphqlOperation(queries.searchUsers, { filter: { age: { eq: 30 } } }));
  };
}


export default Search;

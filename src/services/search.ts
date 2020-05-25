/* tslint:disable */
/* eslint-disable */

import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
class Search {

  async search(searchParams: {}) {
    const intervalValues = ['minHeight', 'maxHeight', 'minAge', 'maxAge'];
    const equalValues = ['animalSize', 'animalType', 'gender', 'hairColor', 'smokeFrequency'];
    const filter = {
      filter: {}
    }
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) {
        if (equalValues.includes(key)) {
          filter.filter[key] = { eq: value }
        }
        if (intervalValues.includes(key)) {
          const [intervalType, parameter] = key.split(/(?=[A-Z])/) || [];
          if (intervalType && parameter) {
            const filterField = {};
            const parameterLowerCase = parameter.toLocaleLowerCase();
            const elasticRange = intervalType === 'min' ? 'gte' : 'lte';
            if (filter.filter[parameterLowerCase]) {
              filter.filter[parameterLowerCase][elasticRange] = value;
            } else {
              filterField[elasticRange] = value;
              filter.filter[parameterLowerCase] = filterField;
            }
          }
        }
      }
    }
    console.log({ 'searchFilter': filter });
    return await API.graphql(graphqlOperation(queries.searchUsers, filter));
  };
}


export default Search;

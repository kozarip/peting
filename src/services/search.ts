/* tslint:disable */
/* eslint-disable */

import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
class Search {

  async search(searchParams: {}) {
    const intervalValues = ['minHeight', 'maxHeight', 'minAge', 'maxAge'];
    const equalValues = ['animalSize', 'animalType', 'gender', 'hairColor', 'smokeFrequency'];
    const filter = {
      filter: {}
    }
    if (searchParams) {
      for (let [key, value] of Object.entries(searchParams)) {
        if (value) {
          if (equalValues.includes(key)) {
            filter.filter[key] = { eq: value }
          }
          if (key === 'exceptUsers' && Array.isArray(value)) {
            filter.filter['and'] = value.map((v) => { return {'cognitoUserName': {'ne' : v}}})
          }
          if (intervalValues.includes(key)) {
            const [intervalType, parameter] = key.split(/(?=[A-Z])/) || [];
            if (intervalType && parameter) {
              const filterField = {};
              const parameterLowerCase = parameter.toLocaleLowerCase()
              const elasticRange = intervalType === 'min' ? 'gte' : 'lte';
              if (value === 0 && intervalType === 'min'){
                value = 9999;
              }
              if (filter.filter[parameterLowerCase]) {
                filter.filter[parameterLowerCase][elasticRange] = value ;
              } else {
                filterField[elasticRange] = value;
                filter.filter[parameterLowerCase] = filterField;
              }
            }
          }
        }
      }
    }
    // console.log({ 'searchFilter': filter });
    return await API.graphql(graphqlOperation(queries.searchUsers, filter));
  };
}


export default Search;

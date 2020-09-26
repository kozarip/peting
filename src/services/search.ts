/* tslint:disable */
/* eslint-disable */

import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
class Search {

  async search(searchParams: {}, currentCityCoordinates) {
    const intervalValues = ['minHeight', 'maxHeight', 'minAge', 'maxAge'];
    const equalValues = ['animalSize', 'gender', 'hairColor', 'smokeFrequency'];
    // const arrayValue = ['animalType']
    const filter = {
      filter: {}
    }

    if (searchParams) {
      for (let [key, value] of Object.entries(searchParams)) {
        if (value || (key === 'gender' && value !== null )) {
          if (key === 'exceptUsers' && Array.isArray(value)) {
            filter.filter['and'] = value.map((v) => { return {'cognitoUserName': {'ne' : v}}})
          }
          if (key === 'animalType' && Array.isArray(value) && value.length > 0 ) {
            filter.filter['or'] = value.map((v) => { return {'animalType': {'eq' : v}}})
          }
          if (key === 'distance') {
            const distances = this.calculateCoordinates(currentCityCoordinates, value);
            filter.filter['cityLat'] = { gte: distances.minLat, lte: distances.maxLat };
            filter.filter['cityLng'] = { gte: distances.minLng, lte: distances.maxLng };
          }
          /* if (arrayValue.includes(key) && Array.isArray(value)) {
            filter.filter['or'] = value.map((v) => {
              const obj = {}
              return obj[key] =  { eq: v }
            })
          } */
          if (equalValues.includes(key)) {
            filter.filter[key] = { eq: value }
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
    console.log(filter);
    return await API.graphql(graphqlOperation(queries.searchUsers, filter));
  };

  calculateCoordinates(currentCity, distance) {
    const distanceLat = 0.005360631 * distance;
    const distanceLng = 0.010580781 * distance;
    const maxLat = currentCity.lat + distanceLat;
    const minLat = currentCity.lat - distanceLat;
    const maxLng = currentCity.lng + distanceLng;
    const minLng = currentCity.lng - distanceLng;
    return {
      maxLat,
      minLat,
      maxLng,
      minLng,
    }
  }
}


export default Search;

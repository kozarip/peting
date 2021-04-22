/* tslint:disable */
/* eslint-disable */

import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { animalType } from '../constants/userFields';
import { SEARCH_LIMIT } from '../constants/constanst';
class Search {
  async search(searchParams: {}, currentCityCoordinates, nextToken) {
    const intervalValues = ['minHeight', 'maxHeight', 'minAge', 'maxAge'];
    const equalValues = ['gender', 'smokeFrequency'];
    // const arrayValue = ['animalType']
    const filter = {
      filter: { "userName": { "ne": " ", } },
      limit: SEARCH_LIMIT,
    }
    if (nextToken != "") {
      filter['nextToken'] = nextToken;
    }
    if (searchParams) {
      for (let [key, value] of Object.entries(searchParams)) {
        if (value || (key === 'gender' && value !== null ) ) {
          if (key === 'exceptUsers' && Array.isArray(value)) {
            filter.filter['and'] = value.map((v) => { return {'cognitoUserName': {'ne' : v}}})
          }
          if (key === 'animalTypes' && Array.isArray(value) && value.length > 0) {
            filter.filter['or'] = value.map((v) => { return {'animalType': {'eq' : animalType.options[v].value}}})
          }
          if (key === 'distance') {
            const distances = this.calculateCoordinates(currentCityCoordinates, value);
            filter.filter['cityLat'] = { gte: distances.minLat, lte: distances.maxLat };
            filter.filter['cityLng'] = { gte: distances.minLng, lte: distances.maxLng };
          }
          if (key === 'gender' && value === -1) {
            filter.filter['or'] = [0, 1].map((v) => { return {'gender': {'eq' : v}}})
          } else if (equalValues.includes(key)) {
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
    if (currentCity.lat === null || currentCity.lng === null) {
      currentCity.lat = 47.7883949;
      currentCity.lng = 18.7434452;
    }
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

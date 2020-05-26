/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      cognitoUserName
      userName
      email
      firstName
      surName
      age
      animalType
      animalSize
      gender
      height
      smokeFrequency
      hairColor
      hobbies
      images
      animalImages
      primaryImageIndex
      animalName
      bio
      search {
        minAge
        maxAge
        animalType
        animalSize
        gender
        minHeight
        maxHeight
        smokeFrequency
        hairColor
        hobbies
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognitoUserName
        userName
        email
        firstName
        surName
        age
        animalType
        animalSize
        gender
        height
        smokeFrequency
        hairColor
        hobbies
        images
        animalImages
        primaryImageIndex
        animalName
        bio
        search {
          minAge
          maxAge
          animalType
          animalSize
          gender
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
        }
      }
      nextToken
    }
  }
`;
export const userByCognitoUserName = /* GraphQL */ `
  query UserByCognitoUserName(
    $cognitoUserName: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCognitoUserName(
      cognitoUserName: $cognitoUserName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cognitoUserName
        userName
        email
        firstName
        surName
        age
        animalType
        animalSize
        gender
        height
        smokeFrequency
        hairColor
        hobbies
        images
        animalImages
        primaryImageIndex
        animalName
        bio
        search {
          minAge
          maxAge
          animalType
          animalSize
          gender
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
        }
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cognitoUserName
        userName
        email
        firstName
        surName
        age
        animalType
        animalSize
        gender
        height
        smokeFrequency
        hairColor
        hobbies
        images
        animalImages
        primaryImageIndex
        animalName
        bio
        search {
          minAge
          maxAge
          animalType
          animalSize
          gender
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
        }
      }
      nextToken
      total
    }
  }
`;

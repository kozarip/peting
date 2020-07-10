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
      likes {
        cognitoUserName
        timestamp
      }
      dislikes {
        cognitoUserName
        timestamp
      }
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
        likes {
          cognitoUserName
          timestamp
        }
        dislikes {
          cognitoUserName
          timestamp
        }
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
export const getMatches = /* GraphQL */ `
  query GetMatches($id: ID!) {
    getMatches(id: $id) {
      id
      user1
      user2
      timestamp
    }
  }
`;
export const listMatchess = /* GraphQL */ `
  query ListMatchess(
    $filter: ModelMatchesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatchess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user1
        user2
        timestamp
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
        likes {
          cognitoUserName
          timestamp
        }
        dislikes {
          cognitoUserName
          timestamp
        }
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
        likes {
          cognitoUserName
          timestamp
        }
        dislikes {
          cognitoUserName
          timestamp
        }
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
export const searchMatchess = /* GraphQL */ `
  query SearchMatchess(
    $filter: SearchableMatchesFilterInput
    $sort: SearchableMatchesSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchMatchess(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user1
        user2
        timestamp
      }
      nextToken
      total
    }
  }
`;

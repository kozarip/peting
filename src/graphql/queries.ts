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
        animalSize
        gender
        animalTypes
        minHeight
        maxHeight
        smokeFrequency
        hairColor
        hobbies
        distance
        isWithMarked
      }
      cityName
      cityLat
      cityLng
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
          animalSize
          gender
          animalTypes
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
          distance
          isWithMarked
        }
        cityName
        cityLat
        cityLng
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
      lastNewMessageSender
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
        lastNewMessageSender
      }
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      user1
      user2
      messages {
        _id
        text
        createdAt
        messagesOwner
      }
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user1
        user2
        messages {
          _id
          text
          createdAt
          messagesOwner
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
          animalSize
          gender
          animalTypes
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
          distance
          isWithMarked
        }
        cityName
        cityLat
        cityLng
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
          animalSize
          gender
          animalTypes
          minHeight
          maxHeight
          smokeFrequency
          hairColor
          hobbies
          distance
          isWithMarked
        }
        cityName
        cityLat
        cityLng
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
        lastNewMessageSender
      }
      nextToken
      total
    }
  }
`;
export const searchChats = /* GraphQL */ `
  query SearchChats(
    $filter: SearchableChatFilterInput
    $sort: SearchableChatSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchChats(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user1
        user2
        messages {
          _id
          text
          createdAt
          messagesOwner
        }
      }
      nextToken
      total
    }
  }
`;

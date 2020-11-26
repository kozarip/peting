/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      deviceId
      isPushNotificationActive
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      deviceId
      isPushNotificationActive
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      deviceId
      isPushNotificationActive
    }
  }
`;
export const createMatches = /* GraphQL */ `
  mutation CreateMatches(
    $input: CreateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    createMatches(input: $input, condition: $condition) {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const updateMatches = /* GraphQL */ `
  mutation UpdateMatches(
    $input: UpdateMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    updateMatches(input: $input, condition: $condition) {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const deleteMatches = /* GraphQL */ `
  mutation DeleteMatches(
    $input: DeleteMatchesInput!
    $condition: ModelMatchesConditionInput
  ) {
    deleteMatches(input: $input, condition: $condition) {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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

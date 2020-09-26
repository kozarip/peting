/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToGivenChat = /* GraphQL */ `
  subscription SubscribeToGivenChat($id: ID!) {
    subscribeToGivenChat(id: $id) {
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
export const subscribeToUserMatches = /* GraphQL */ `
  subscription SubscribeToUserMatches($id: ID!) {
    subscribeToUserMatches(id: $id) {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
        animalTypes
        minHeight
        maxHeight
        smokeFrequency
        hairColor
        hobbies
        distance
      }
      cityName
      cityLat
      cityLng
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
        animalTypes
        minHeight
        maxHeight
        smokeFrequency
        hairColor
        hobbies
        distance
      }
      cityName
      cityLat
      cityLng
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
        animalTypes
        minHeight
        maxHeight
        smokeFrequency
        hairColor
        hobbies
        distance
      }
      cityName
      cityLat
      cityLng
    }
  }
`;
export const onCreateMatches = /* GraphQL */ `
  subscription OnCreateMatches {
    onCreateMatches {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const onUpdateMatches = /* GraphQL */ `
  subscription OnUpdateMatches {
    onUpdateMatches {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const onDeleteMatches = /* GraphQL */ `
  subscription OnDeleteMatches {
    onDeleteMatches {
      id
      user1
      user2
      timestamp
      lastNewMessageSender
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
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

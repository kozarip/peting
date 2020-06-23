/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      likedUsers
      disLikedUsers
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
      likedUsers
      disLikedUsers
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
      likedUsers
      disLikedUsers
    }
  }
`;
export const onCreateMatches = /* GraphQL */ `
  subscription OnCreateMatches {
    onCreateMatches {
      id
      user1
      user2
    }
  }
`;
export const onUpdateMatches = /* GraphQL */ `
  subscription OnUpdateMatches {
    onUpdateMatches {
      id
      user1
      user2
    }
  }
`;
export const onDeleteMatches = /* GraphQL */ `
  subscription OnDeleteMatches {
    onDeleteMatches {
      id
      user1
      user2
    }
  }
`;

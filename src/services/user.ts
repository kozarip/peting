/* tslint:disable */
/* eslint-disable */

import { graphqlOperation, API, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { UserType } from '../types/user';
import { exception } from 'console';
import { Alert } from 'react-native';

class User {
  private currentCognitoUserAttributes: any;
  private currentUserAttributes: any;

  public async init() {
    await this.setCurrentCognitoUserAttributes();
    await this.setCurrentUserAttributes();
  }

  private async setCurrentCognitoUserAttributes() {
    if (this.currentCognitoUserAttributes) {
      return this.currentCognitoUserAttributes
    }
    const currentCognitoUserAttributes = await Auth.currentUserInfo();
    this.currentCognitoUserAttributes = currentCognitoUserAttributes;
    return this.currentCognitoUserAttributes;
  }

  private async setCurrentUserAttributes() {
    if (this.currentUserAttributes) {
      return this.currentUserAttributes
    }
    const currentUser = await this.getUserByCognitoUserName(this.currentCognitoUserAttributes.username);
    this.currentUserAttributes = currentUser;
    return this.currentUserAttributes;
  }

  public getCurrentCognitoUserAttributes() {
    return this.currentCognitoUserAttributes;
  }

  public getCurrentUserAttributes() {
    return this.currentUserAttributes;
  }

  public async crateNewUserIfNotExist() {
    return this.init().then(async () => {
      return this.isCurrentUserExist().then((isUserExist) => {
        if (!isUserExist) {
          this.saveNewUser();
          return false;
        }
        return true;
      }).catch((error) => {
        Alert.alert('There has been a problem with user exist checking: ' + error.message);
      });
    }).catch((error) => {
      Alert.alert('There has been a problem with the init: ' + error.message);
    });
  }

  public async isCurrentUserExist() {
    await this.init();
    return this.currentUserAttributes.data.userByCognitoUserName.items.length !== 0;
  }

  public async getUserByCognitoUserName(cognitoUserName: string) {
    return await (API.graphql(graphqlOperation(queries.userByCognitoUserName, { cognitoUserName })));
  }

  public saveNewUser() {
    const newUser = {
      cognitoUserName: this.currentCognitoUserAttributes.username,
      userName: ' ',
      email: this.currentCognitoUserAttributes.attributes.email,
      firstName: this.currentCognitoUserAttributes.attributes.given_name,
      surName: this.currentCognitoUserAttributes.attributes.family_name,
      isPushNotificationActive: true,
    }
    API.graphql(graphqlOperation(mutations.createUser, { input: newUser }));
  }

  public updateUser(user: UserType) {
    //console.log({savedUser: user});
    API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
  }

  public removeUser(userId) {
    API.graphql(graphqlOperation(mutations.deleteUser, { input: {id: userId} }));
  }

  public subscribeToUser(id, updateUser, items) {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribeToGivenUser, { id: id }),
    ).subscribe({
      next: (resultUser) => {
        if (resultUser.value.data.subscribeToGivenUser) {
          updateUser(resultUser.value.data.subscribeToGivenUser, items);
        }
      },
    });
    return subscription;
  }

}

export default User;

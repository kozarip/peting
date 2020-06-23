/* tslint:disable */
/* eslint-disable */

import { graphqlOperation, API, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { UserType } from '../types/user';

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
      })
    })
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
    }
    API.graphql(graphqlOperation(mutations.createUser, { input: newUser }));
  }

  public updateUser(user: UserType) {
    //console.log({savedUser: user});
    API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
  }

}

export default User;

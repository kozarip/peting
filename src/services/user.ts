/* tslint:disable */
/* eslint-disable */

import { graphqlOperation, API, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { UserType } from '../types/user';

class User {
  private currentCognitoUserAttributes: any;
  private currentUser: any;

  async isCurrentUserExist() {
    await this.getCurrentCognitoUserAttributes();
    await this.getCurrentUSer();

    return this.currentUser.data.userByCognitoUserName.items.length;
  }

  async getCurrentCognitoUserAttributes() {
    if (this.currentCognitoUserAttributes) {
      return this.currentCognitoUserAttributes
    }
    const currentCognitoUserAttributes = await Auth.currentUserInfo();
    this.currentCognitoUserAttributes = currentCognitoUserAttributes;
    return this.currentCognitoUserAttributes;
  }

  async getCurrentUSer() {
    if (this.currentUser) {
      return this.currentUser
    }
    const currentUser = await this.getUserByCognitoUserName(this.currentCognitoUserAttributes.username);
    this.currentUser = currentUser;
    return this.currentUser;
  }

  async getUserByCognitoUserName(cognitoUserName: string) {
    return await (API.graphql(graphqlOperation(queries.userByCognitoUserName, { cognitoUserName })));
  }

  async getUserData(userName?: string) {
    const currentUserName = userName || this.currentCognitoUserAttributes.username;
    return await API.graphql(graphqlOperation(queries.userByCognitoUserName, { cognitoUserName: currentUserName }))
  }

  saveNewUser() {
    const newUser = {
      cognitoUserName: this.currentCognitoUserAttributes.username,
      userName: 'Username',
      email: this.currentCognitoUserAttributes.attributes.email,
      firstName: this.currentCognitoUserAttributes.attributes.given_name,
      surName: this.currentCognitoUserAttributes.attributes.family_name,
    }
    API.graphql(graphqlOperation(mutations.createUser, { input: newUser }));
  }

  updateUser(user: UserType) {
    API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
  }

}

export default User;

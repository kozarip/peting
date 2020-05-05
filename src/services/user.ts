/* tslint:disable */
/* eslint-disable */

import { graphqlOperation, API, Auth } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { UserType } from '../types/user';


class User {
  currentCognitoUserAttributes: any;
  currentUser: any;

  async isCurrentUserExist() {
    const currentCognitoUserAttributes = await Auth.currentUserInfo();
    this.currentCognitoUserAttributes = currentCognitoUserAttributes;

    const currentUser = await this.getUserByCognitoUserName(currentCognitoUserAttributes.username);
    this.currentUser = currentUser;
    return currentUser.data.userByCognitoUserName.items.length;
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
      userName: this.currentCognitoUserAttributes.username,
      email: this.currentCognitoUserAttributes.attributes.email,
      firstName: this.currentCognitoUserAttributes.attributes.given_name,
      surName: this.currentCognitoUserAttributes.attributes.family_name,
    }
    API.graphql(graphqlOperation(mutations.createUser, { input: newUser }));
  }

  updateUser(user: UserType) {
    console.log(user);
    API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
  }

}

export default User;

/* eslint-disable no-restricted-syntax */
/* Amplify Params - DO NOT EDIT
	API_PETINGDATES_GRAPHQLAPIENDPOINTOUTPUT
	API_PETINGDATES_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { cognitoUserNameText, type } = getUserData(event);
  console.log({ TYPE: type });
  if (cognitoUserNameText) {
    const userByCognitoUserName = `
      query userByCognitoUserName {
        userByCognitoUserName(cognitoUserName: "${cognitoUserNameText}") {
          items {
            deviceId
            userName
          }
        }
      }
    `;
    console.log({ userByCognitoUserName });

    try {
      const graphqlData = await axios({
        url: 'https://crwpmoua3bdjtgdlrsh4kbqss4.appsync-api.eu-central-1.amazonaws.com/graphql',
        method: 'post',
        headers: {
          'x-api-key': 'da2-4sjeimaplfdldmxuor4xqeafgu',
        },
        data: {
          query: userByCognitoUserName,
        },
      });
      const body = {
        graphqlData: graphqlData.data.data.userByCognitoUserName,
      };
      sendPushNotification(body.graphqlData.items[0].deviceId, type);
    } catch (err) {
      console.log('error posting to appsync: ', err);
    }
  }
};

const getUserData = (event) => {
  let messageText = '';
  let cognitoUserNameText = '';
  let type = '';
  for (const record of event.Records) {
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.dynamodb.NewImage
      && record.dynamodb.NewImage.messages) {
      if (record.dynamodb.NewImage.messages.L.length === 0) {
        type = 'match';
        cognitoUserNameText = record.dynamodb.NewImage.user2.S;
      } else {
        const lastItem = record.dynamodb.NewImage.messages.L[record.dynamodb.NewImage.messages.L.length - 1];
        messageText = lastItem.M.text.S;
        type = 'message';
        cognitoUserNameText = record.dynamodb.NewImage.user1.S === lastItem.M.messagesOwner.S ? record.dynamodb.NewImage.user2.S : record.dynamodb.NewImage.user1.S;
      }
    }
  }
  return {
    messageText,
    cognitoUserNameText,
    type,
  };
};

const sendPushNotification = async (token, type) => {
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=AAAA6k7Pts0:APA91bGU2zi8iMtdOh9tiBajenePX2quaoASe0flPqpVWni9rJANfJdp0MZ82ntwogoaB_-IW1cjeL8hNvhd-V-FKdbe3q4kurlhvS42kE8S4iKMvqbvgloQPgHpbGwMTJ_0ioGiKqLa`,
    },
    body: JSON.stringify({
      to: token,
      priority: 'normal',
      data: {
        experienceId: '@kozarip/peting',
        message: type === 'message' ? 'Új üzeneteted érkezett' : 'Új matched van',
      },
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => console.log(json));
};

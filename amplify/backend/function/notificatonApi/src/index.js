/* eslint-disable no-restricted-syntax */
/* Amplify Params - DO NOT EDIT
	API_PETINGDATES_GRAPHQLAPIENDPOINTOUTPUT
	API_PETINGDATES_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const fetch = require('node-fetch');
const apn = require('apn');

exports.handler = async (event) => {
  const { cognitoUserNameText, type } = getUserData(event);
  if (cognitoUserNameText) {
    const userByCognitoUserName = `
      query userByCognitoUserName {
        userByCognitoUserName(cognitoUserName: "${cognitoUserNameText}") {
          items {
            deviceId
            userName
            isPushNotificationActive
            cityName
          }
        }
      }
    `;

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
      if (body.graphqlData.items[0].deviceId && body.graphqlData.items[0].isPushNotificationActive !== false) {
        country = body.graphqlData.items[0].deviceId.split(',')[1];
        let lang = 'en';
        switch (country) {
          case ('Magyarország'):
            lang = 'hu';
            break;
          case ('Deutschland'):
            lang = 'de';
            break;
          default:
            lang = 'en';
        }

        await sendPushNotification(body.graphqlData.items[0].deviceId, type, lang);
      }
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

const sendPushNotification = async (token, type, lang) => {
  let newMessage = 'New message';
  let newMatch = 'New match';
  switch (lang) {
    case ('de'):
      newMessage = 'Neue Nachricht';
      newMatch = 'Neues Spiel';
      break;
    case ('hu'):
      newMessage = 'Új üzeneteted érkezett';
      newMatch = 'Új üzeneteted érkezett';
      break;
    default:
      newMessage = 'New message';
      newMatch = 'New match';
  }

  // Android sender
  if (token.length > 64) {
    console.log(`Android | type: ${type} | Token: ${token}`);
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=AAAA6k7Pts0:APA91bGU2zi8iMtdOh9tiBajenePX2quaoASe0flPqpVWni9rJANfJdp0MZ82ntwogoaB_-IW1cjeL8hNvhd-V-FKdbe3q4kurlhvS42kE8S4iKMvqbvgloQPgHpbGwMTJ_0ioGiKqLa',
      },
      body: JSON.stringify({
        to: token,
        messageType: type,
        collapse_key: type,
        'apns-collapse-id': type,
        data: {
          experienceId: '@kozarip/peting',
          message: type === 'message' ? newMessage : newMatch,
          priority: 'high',
          badge: 1,
          categoryId: type,
        },
        aps: {
          alert: {
            title: type === 'message' ? newMessage : newMatch,
          },
          category: type,
          badge: 1,
          'thread-id': type,
        },
      }),
    })
      .then((res) => {
        console.log('Android', res);
        return res.json();
      })
      .then((json) => console.log('Android', json));
  }
  // IOS sender
  else {
    console.log(`IOS | type: ${type} | Token: ${token}`);
    const IS_PRODUCTION = true;

    try {
      const options = {
        token: {
          key: 'AuthKey.p8',
          keyId: 'A28V9T9LTL',
          teamId: 'RC9PY4VZVL',
        },
        production: IS_PRODUCTION,
      };
      const notification = new apn.Notification();
      const apnProvider = await new apn.Provider(options);

      notification.expiry = Math.floor(Date.now() / 1000) + 3600 * 24 * 5;
      notification.title = type === 'message' ? newMessage : newMatch;
      notification.topic = 'host.exp.exponent.peting';
      notification.urlArgs = [];

      await apnProvider.send(notification, token).then((result) => {
        console.log('IOS', result);
        console.log('IOS', JSON.stringify(result.failed));
      });
    } catch (error) {
      console.log(error);
    }
  }
};

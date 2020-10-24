/* eslint-disable no-restricted-syntax */
/* Amplify Params - DO NOT EDIT
	API_PETINGDATES_GRAPHQLAPIENDPOINTOUTPUT
	API_PETINGDATES_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const { Expo } = require('expo-server-sdk');

exports.handler = async (event) => {
  const { cognitoUserNameText, type } = getUserData(event);
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
      sendPushNotification([body.graphqlData.items[0].deviceId], type);
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
    if (record.dynamodb.NewImage && record.dynamodb.NewImage.messages && record.dynamodb.NewImage.messages.L.length > 0) {
      console.log(record.dynamodb.NewImage.messages.L.length);
      const lastItem = record.dynamodb.NewImage.messages.L[record.dynamodb.NewImage.messages.L.length - 1];
      messageText = lastItem.M.text.S;
      type = 'message';
      cognitoUserNameText = record.dynamodb.NewImage.user1.S === lastItem.M.messagesOwner.S ? record.dynamodb.NewImage.user2.S : record.dynamodb.NewImage.user1.S;
    } else if (record.dynamodb.NewImage
      && (typeof record.dynamodb.OldImage === 'undefined')
      && record.dynamodb.NewImage.__typename.S === 'Matches'
    ) {
      type = 'match';
      cognitoUserNameText = record.dynamodb.NewImage.user2.S;
    }
  }
  return {
    messageText,
    cognitoUserNameText,
    type,
  };
};

const sendPushNotification = async (somePushTokens, type) => {
  const expo = new Expo();
  // Create the messages that you want to send to clients
  const messages = [];
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: 'default',
      body: type === 'message' ? 'Új üzeneteted érkezett' : 'Új matched van',
      data: { withSome: 'data' },
    });
  }
  console.log(messages);
  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

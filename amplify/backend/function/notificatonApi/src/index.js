/* eslint-disable no-restricted-syntax */
/* Amplify Params - DO NOT EDIT
	API_PETINGDATES_GRAPHQLAPIENDPOINTOUTPUT
	API_PETINGDATES_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

exports.handler = async (event, context) => {
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
    } else if (record.dynamodb.NewImage && record.dynamodb.NewImage.__typename.S === 'Matches') {
      type = 'match';
      cognitoUserNameText = record.dynamodb.NewImage.user2.S;
    }
  }
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
    console.log({userByCognitoUserName});
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
      let messages = [
        {
          to: body.graphqlData.items[0].deviceId,
          sound: 'default',
          title: type === 'message' ? 'Új üzeneteted érkezett' : 'Új matched van',
          body: '',
          data: { data: 'goes here' },
        },
      ];
      console.log({ MESSAGE: messages });
      axios.post('https://exp.host/--/api/v2/push/send', messages[0])
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return `Successfully processed ${event.Records.length} records.`;
    } catch (err) {
      console.log('error posting to appsync: ', err);
    }
  }
};

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
};

const handleNotification = () => {
  //console.warn('ok! got your notif');
};

const sendNotificationImmediately = async (title, body) => {
  const notificationId = await Notifications.presentLocalNotificationAsync({
    title,
    body,
  });
  Notifications.addListener(handleNotification);
  console.log(notificationId);
};

const scheduleNotification = async (title, body, period: 'minute' | 'hour' | 'day') => {
  let notificationId = await Notifications.scheduleLocalNotificationAsync(
    {
      title,
      body,
    },
    {
      repeat: period,
      time: new Date().getTime() + 10000,
    },
  );
  Notifications.addListener(handleNotification);
  console.log(notificationId);
};

const clearNotifications = async () => {
  const subscription = await Notifications.addNotificationReceivedListener((notification) => {
    console.log(notification);
  });
  return () => subscription.remove();
};

export {
  askPermissions,
  sendNotificationImmediately,
  scheduleNotification,
  clearNotifications,
};
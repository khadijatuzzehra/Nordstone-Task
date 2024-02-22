import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDeviceInformation = async () => {
  try {
    console.log('here now');
    let fcmToken = await AsyncStorage.getItem('FCMToken');
    if (!fcmToken) {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          await messaging().registerDeviceForRemoteMessages();
        } else {
          throw new Error('User has declined permissions');
        }
      }

      fcmToken = await messaging().getToken();

      if (fcmToken) {
        await AsyncStorage.setItem('FCMToken', fcmToken);
      }
    }
    await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken)).then(
      () => {
        console.log('token from fcm', fcmToken);
      },
    );
  } catch (error) {
    console.error('Device information retrieval error:', error);
    throw error;
  }
};

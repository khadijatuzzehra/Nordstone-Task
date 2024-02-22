import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, AlertWithIcon} from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts} from '../../../theme';
import {getDeviceInformation} from '../../../services/notifications/FirebaseNotifications';
import messaging from '@react-native-firebase/messaging';
import {Dimensions} from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../../../store/actions/ActionTypes';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, request} from 'react-native-permissions';
import {useAxios} from '../../../utils/api';
LogBox.ignoreAllLogs();
console.warn = () => {};

const Notification = () => {
  const {postNotification} = useAxios();
  const buttonController = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
      postNotification(JSON.parse(fcmToken));
    }
  };
  const dispatch = useDispatch();
  const handleLogout = navigate => {
    AsyncStorage.removeItem('userInfo').then(() => {
      dispatch({type: LOGOUT, payload: null});
    });
  };

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const getDeviceInfo = async () => {
    await getDeviceInformation();
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    }
    getDeviceInfo();

    messaging().onNotificationOpenedApp(async remoteMessage => {
      const notificationData = JSON.stringify(remoteMessage);
      if (notificationData) {
        navigation.navigate('Notification');
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {});

    messaging().setBackgroundMessageHandler(async remoteMessage => {});

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setVisible(true);
      setAlertTitle(remoteMessage.notification.title);
      setAlertDescription(remoteMessage.notification.body);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View>
            <Text
              bold
              text="Hi Alex!"
              size={Fonts.size.font16}
              textColor={Colors.White}
            />
            <Text
              text="Good Morning"
              size={Fonts.size.font14}
              textColor={Colors.White}
            />
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={30} color={Colors.Primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentCenter}>
        <Text
          text="**Please be informed that by clicking the button below, this will send notificatio directly to your device.**"
          bold
          size={Fonts.size.font14}
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <Button
          onClick={buttonController}
          buttonType="fill"
          text="Send Notification"
          backgroundColor={Colors.DangerColor}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.19}
          width={Dimensions.Width * 0.9}
        />
        <AlertWithIcon
          heading={alertTitle}
          isVisible={visible}
          description={alertDescription}
          iconName="checkmark-done-outline"
          iconColor={Colors.Primary}
          onCancel={() => setVisible(false)}
          button={'Thanks'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.Height * 0.2,
    backgroundColor: Colors.Primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Dimensions.Height * 0.05,
    paddingHorizontal: Dimensions.Width * 0.05,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: Colors.White,
    height: Dimensions.Height * 0.07,
    width: Dimensions.Height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Dimensions.Height * 0.09,
    marginHorizontal: Dimensions.Width * 0.05,
  },
  gap: {
    marginVertical: Dimensions.Height * 0.05,
  },
});

export default Notification;

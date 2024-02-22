import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadText = async text => {
  try {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (!userInfoString) {
      return null;
    }
    const userInfo = JSON.parse(userInfoString);
    const email = userInfo?.email;
    firestore()
      .collection('Text')
      .add({
        email: email,
        text: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Text Stored');
      });
  } catch (err) {
    console.log(err);
  }
};

import {Platform, Linking} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const selectFromGallery = async () => {
  try {
    const androidVersion = Platform.constants.Release;
    let permissionToRequest;
    if (androidVersion >= 13) {
      permissionToRequest = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permissionToRequest = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
    const permissionResult = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : permissionToRequest,
    );

    if (permissionResult === 'granted') {
      try {
        const response = await ImageCropPicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          cropperCircleOverlay: true,
          forceJpg: true,
          width: 300,
          height: 300,
        });
        if (!response.didCancel && !response.error) {
          return response;
        } else {
          return 'User cancelled Image Selection';
        }
      } catch (error) {
        return error;
      }
    } else if (
      permissionResult === 'denied' ||
      permissionResult === 'blocked'
    ) {
      const previouslyDenied = await AsyncStorage.getItem(
        'galleryPermissionDenied',
      );
      if (previouslyDenied === 'true') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      } else {
        await AsyncStorage.setItem('galleryPermissionDenied', 'true');
      }
    }
  } catch (error) {
    return error;
  }
};

export const uploadFromCamera = async () => {
  try {
    const permissionResult = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (permissionResult === 'granted') {
      const response = await ImageCropPicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: true,
        forceJpg: true,
        width: 300,
        height: 300,
      });

      if (!response.didCancel && !response.error) {
        return response;
      } else {
        return 'Camera launch cancelled or error occurred.';
      }
    } else if (
      permissionResult === 'denied' ||
      permissionResult === 'blocked'
    ) {
      const previouslyDenied = await AsyncStorage.getItem(
        'cameraPermissionDenied',
      );
      if (previouslyDenied === 'true') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      } else {
        await AsyncStorage.setItem('cameraPermissionDenied', 'true');
      }
    }
  } catch (error) {
    return error;
  }
};

export const uploadPicture = async picture => {
  const userInfoString = await AsyncStorage.getItem('userInfo');
  if (!userInfoString) {
    return null;
  }
  const userInfo = JSON.parse(userInfoString);
  const email = userInfo?.email;
  const uploadUri =
    Platform.OS === 'ios'
      ? picture?.path?.replace('file://', '')
      : picture?.path;
  let ref = email + new Date().getTime();
  const task = storage().ref(ref).putFile(uploadUri);
  try {
    await task;
    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
    const url = await storage().ref(ref).getDownloadURL();
    try {
      const userImagesRef = firestore().collection('UserImages');
      const querySnapshot = await userImagesRef
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async documentSnapshot => {
          const docRef = userImagesRef.doc(documentSnapshot.id);
          await docRef.update({image: url});
          console.log('Image URL updated successfully.');
        });
      } else {
        await userImagesRef.add({
          email: email,
          image: url,
        });
        console.log('New document with image URL created successfully.');
      }
      return url;
    } catch (error) {
      console.error('Error loading picture:', error);
    }
  } catch (e) {
    console.error(e);
  }
};

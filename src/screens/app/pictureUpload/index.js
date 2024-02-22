import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Wrapper, MediaPicker, Text, Button, Loader} from '../../../components';
import firestore from '@react-native-firebase/firestore';
import {Dimensions} from '../../../utils/constants';
import {Colors, Fonts} from '../../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  uploadPicture,
  uploadFromCamera,
  selectFromGallery,
} from '../../../services/mediaUpload';
import Images from '../../../utils/media';

const PictureUpload = () => {
  const [pictureModal, setPictureModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePictureUpload = async pictureOption => {
    let picture = '';
    setPictureModal(false);
    setLoading(true);
    if (pictureOption === 'Camera') {
      picture = await uploadFromCamera();
    } else {
      picture = await selectFromGallery();
    }
    const url = await uploadPicture(picture);
    setImageUrl(url);
    setLoading(false);
  };
  useEffect(() => {
    loadPicture();
  }, []);

  const loadPicture = async () => {
    setLoading(true);
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (!userInfoString) {
      setLoading(false);
      return null;
    }
    const userInfo = JSON.parse(userInfoString);
    firestore()
      .collection('UserImages')
      .where('email', '==', userInfo?.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const userData = documentSnapshot.data();
          setImageUrl(userData?.image);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
    setLoading(false);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <View style={styles.container}>
        <Text
          text="**Replace or Upload Image to firestore using Camera or Gallery**"
          bold
          size={Fonts.size.font14}
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <Image source={Images.User} style={styles.image} />
        )}
        <Button
          onClick={handlePictureUpload}
          buttonType="fill"
          text="Replace/Upload Image"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
        />
      </View>
      <MediaPicker
        isVisible={pictureModal}
        onCancel={() => setPictureModal(false)}
        onSelect={handlePictureUpload}
      />
    </Wrapper>
  );
};

export default PictureUpload;

const styles = StyleSheet.create({
  container: {
    marginVertical: Dimensions.Height * 0.2,
    alignItems: 'center',
    marginHorizontal: Dimensions.Width * 0.04,
  },
  image: {
    height: Dimensions.Height * 0.4,
    width: Dimensions.Height * 0.4,
    borderColor: Colors.Gray,
    borderWidth: 2,
    marginVertical: Dimensions.Height * 0.02,
  },
});

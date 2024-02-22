import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Wrapper, MediaPicker, Button} from '../../../components';
import Images from '../../../utils/media';
import {Dimensions} from '../../../utils/constants';
import {Colors} from '../../../theme';
import {
  uploadFromCamera,
  selectFromGallery,
} from '../../../services/media_upload';

const PictureUpload = () => {
  const [pictureModal, setPictureModal] = useState(false);
  const handlePictureUpload = async pictureOption => {
    console.log('joining picture');
    let picture = '';
    setPictureModal(false);
    if (pictureOption === 'Camera') {
      picture = await uploadFromCamera();
    } else {
      picture = await selectFromGallery();
    }
    console.log(picture);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <Image source={Images.User} style={styles.image} />
        <Button
          onClick={() => setPictureModal(true)}
          buttonType="fill"
          text="Replace/Upload Image"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.08}
          width={Dimensions.Width * 0.8}
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
    alignSelf: 'center',
    marginVertical: Dimensions.Height * 0.08,
  },
  image: {
    height: Dimensions.Height * 0.6,
    width: Dimensions.Width * 0.8,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderColor: Colors.Primary,
    borderWidth: 2,
    marginBottom: Dimensions.Height * 0.02,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Dimensions.Height * 0.05,
  },
});

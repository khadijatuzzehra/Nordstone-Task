import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button, Wrapper} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';

const TextUpload = () => {
  const [text, setText] = useState('');
  const buttonController = async () => {
    console.log('hey');
  };
  const handleChange = textReceived => {
    setText(textReceived);
    console.log(textReceived);
  };
  return (
    <Wrapper>
      <View style={styles.container}>
        <Text
          text={
            'Enter some text here, on pressing the submit button this text will be stored in Firestore. \n'
          }
          style={styles.title}
        />

        <Input
          fieldType="description"
          multiline={false}
          placeholder="Enter something..."
          height={Dimensions.Height * 0.15}
          width={Dimensions.Width * 0.9}
          textColor={Colors.DarkerGray}
          onChangeText={txt => handleChange(txt)}
        />
        <Button
          onClick={buttonController}
          buttonType="fill"
          text="Submit"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.05}
          width={Dimensions.Width * 0.8}
          style={styles.button}
        />
        <View style={styles.title} />
        <Text
          text={'You entered \n'}
          size={Fonts.size.font14}
          bold
          textColor={Colors.Gray}
        />
        <Text text={text} />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Dimensions.Height * 0.09,
    marginHorizontal: Dimensions.Width * 0.02,
    alignItems: 'center',
  },
  title: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    width: Dimensions.Width,
    marginBottom: Dimensions.Height * 0.02,
  },

  button: {
    marginVertical: Dimensions.Height * 0.06,
  },
});

export default TextUpload;

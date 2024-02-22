import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {Text, Input, Button, Wrapper, Alert} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';
import {uploadText} from '../../../services/textUpload';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const TextUpload = () => {
  const [reset, setReset] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonController = async data => {
    console.log(data.description);
    await uploadText(data.description);
    setVisible(true);
    setReset(true);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  return (
    <Wrapper>
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.container}>
          <Text
            text={
              '**Enter some text here, on pressing the submit button this text will be stored in Firestore.** \n'
            }
            bold
            size={Fonts.size.font14}
            textColor={Colors.Gray}
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                fieldType="description"
                multiline={false}
                placeholder="Enter something..."
                height={Dimensions.Height * 0.15}
                width={Dimensions.Width * 0.9}
                textColor={Colors.DarkerGray}
                onChangeText={txt => {
                  onChange(txt);
                  setReset(false);
                }}
                reset={reset}
              />
            )}
            name="description"
            rules={{
              required: 'Text is required',
              minLength: {
                value: 2,
                message: 'Text must be at least 2 characters',
              },
            }}
          />
          {errors.description && (
            <Text
              text={errors.description.message}
              textColor={Colors.DangerColor}
            />
          )}
          <Button
            onClick={handleSubmit(buttonController)}
            buttonType="fill"
            text="Submit"
            backgroundColor={Colors.Primary}
            textColor={Colors.White}
            bold
            height={Dimensions.Height * 0.05}
            width={Dimensions.Width * 0.8}
            style={styles.button}
          />
          <Alert
            heading={'Success'}
            isVisible={visible}
            description={'Text stored successfully'}
            iconName="notifications"
            iconColor={Colors.Primary}
            onCancel={() => setVisible(false)}
            button={'OK'}
          />
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  container: {
    marginVertical: Dimensions.Height * 0.2,
    marginHorizontal: Dimensions.Width * 0.03,
    alignItems: 'center',
  },
  button: {
    marginVertical: Dimensions.Height * 0.06,
  },
});

export default TextUpload;

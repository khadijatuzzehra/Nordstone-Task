import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Input, Text, Wrapper, Alert} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const handleReset = async data => {
    try {
      await auth().sendPasswordResetEmail(data.email);
      console.log(
        'Password Reset Email Sent',
        'Check your email to reset your password.',
      );
      setSuccessAlertVisible(true);
    } catch (err) {
      setVisible(true);
    }
  };

  return (
    <Wrapper>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={[styles.contentCenter]}>
          <View style={[styles.gap]}>
            <Text
              size={Fonts.size.font16}
              text="Reset Password!"
              bold
              textColor={Colors.Primary}
            />
            <Text
              size={Fonts.size.font11}
              text="Enter email, we will send a reset link to your email."
              textColor={Colors.Gray}
              styles={styles.gapSmall}
            />
          </View>

          <Text
            bold
            size={Fonts.size.font11}
            text="Email"
            textColor={Colors.Gray}
            styles={[styles.gapSmall]}
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                fieldType="email"
                placeholder="Please enter your email"
                textColor={Colors.DarkerGray}
                styles={styles.gapSmall}
                onChangeText={text => {
                  onChange(text);
                }}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter valid email address',
              },
            }}
          />
          {errors.email && (
            <Text text={errors.email.message} textColor={Colors.DangerColor} />
          )}

          <Button
            onClick={handleSubmit(handleReset)}
            buttonType="fill"
            text="Send Link"
            backgroundColor={Colors.Primary}
            textColor={Colors.White}
            bold
            height={Dimensions.Height * 0.05}
            style={styles.gap}
          />
        </View>
        <Alert
          heading={'Invalid Email'}
          isVisible={visible}
          description={'Kindly enter valid email'}
          iconName="notifications"
          iconColor={Colors.Primary}
          onCancel={() => setVisible(false)}
          button={'OK'}
        />
        <Alert
          heading={'Success'}
          isVisible={successAlertVisible}
          description={'Password reset link sent successfully'}
          iconName="notifications"
          iconColor={Colors.Primary}
          onCancel={() => {
            setSuccessAlertVisible(false);
            navigation.navigate('Login');
          }}
          button={'OK'}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentCenter: {
    justifyContent: 'center',
    marginTop: Dimensions.Height * 0.2,
    marginHorizontal: Dimensions.Width * 0.06,
  },
  rowItems: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.Gray,
    borderTopWidth: 0.5,
    marginTop: Dimensions.Height * 0.02,
  },
  gap: {marginTop: Dimensions.Height * 0.02},
  gapSmall: {marginTop: Dimensions.Height * 0.01},
});

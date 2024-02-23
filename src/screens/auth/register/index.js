import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Input, Text, Wrapper, Loader, Alert} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const handleRegister = async data => {
    console.log(data.email, data.password);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login');
      })
      .catch(error => {
        setLoading(false);
        setVisible(true);

        console.error(error);
      });
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={[styles.contentCenter]}>
          <View style={[styles.gap]}>
            <Text
              size={Fonts.size.font16}
              text="Sign up!"
              bold
              textColor={Colors.Primary}
            />
            <Text
              size={Fonts.size.font11}
              text="Enter your details to sign up."
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

          <Text
            bold
            size={Fonts.size.font11}
            text="Password"
            textColor={Colors.Gray}
            styles={[styles.gapSmall]}
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                fieldType="password"
                placeholder="Please enter your password"
                textColor={Colors.DarkerGray}
                styles={styles.gapSmall}
                onChangeText={text => {
                  onChange(text);
                }}
              />
            )}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/,
                message:
                  'Password must contain at least 1 number, 1 capital letter, and no spaces',
              },
            }}
          />
          {errors.password && (
            <Text
              text={errors.password.message}
              textColor={Colors.DangerColor}
            />
          )}

          <Button
            onClick={handleSubmit(handleRegister)}
            buttonType="fill"
            text="Register"
            backgroundColor={Colors.Primary}
            textColor={Colors.White}
            bold
            height={Dimensions.Height * 0.05}
            style={styles.gap}
          />
          <View style={styles.rowItems}>
            <Text
              text={'Already have an account? '}
              styles={styles.gap}
              textColor={Colors.Gray}
            />
            <Button
              onClick={() => navigation.navigate('Login')}
              buttonType="border"
              text="Login"
              borderColor={Colors.Primary}
              textColor={Colors.Primary}
              height={Dimensions.Height * 0.05}
              width={Dimensions.Width * 0.4}
              style={styles.gap}
            />
          </View>
        </View>
        <Alert
          heading={'User exists'}
          isVisible={visible}
          description={'Try login or register using different email!'}
          iconName="notifications"
          iconColor={Colors.Primary}
          onCancel={() => setVisible(false)}
          button={'OK'}
        />
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export default Register;
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

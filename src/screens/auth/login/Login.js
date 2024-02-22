import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text, Wrapper} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions, GlobalStyles} from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LOGIN_SUCCESS} from '../../../store/actions/ActionTypes';
import Images from '../../../utils/media';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const handleLogin = () => {
    console.log('Hello');
    let info = {name: 'John', email: 'john@example.com'};
    AsyncStorage.setItem('userInfo', JSON.stringify(info)).then(() => {
      dispatch({type: LOGIN_SUCCESS, payload: info});
    });
  };
  const handleChange = () => {
    console.log('User is typing something');
  };
  return (
    <Wrapper>
      <Image
        source={Images.Logo}
        style={[
          GlobalStyles.squareMedium,
          GlobalStyles.imageContain,
          GlobalStyles.alignSelfCenter,
          GlobalStyles.centerDiv,
        ]}
      />
      <View style={[GlobalStyles.contentCenter]}>
        <View
          style={[GlobalStyles.alignItemsLeft, GlobalStyles.marginTopMedium]}>
          <Text
            size={Fonts.size.font16}
            text="Sign in!"
            bold
            textColor={Colors.Primary}
            styles={GlobalStyles.marginTopLarge}
          />
          <Text
            size={Fonts.size.font11}
            text="Enter your details to login to Budget Buddy"
            textColor={Colors.Gray}
            styles={GlobalStyles.marginVerticalSmall}
          />
        </View>

        <Text
          bold
          size={Fonts.size.font11}
          text="Email"
          textColor={Colors.Gray}
          styles={[GlobalStyles.marginTopSmall, GlobalStyles.alignItemsLeft]}
        />
        <Input
          fieldType="email"
          placeholder="Please enter your email"
          textColor={Colors.DarkerGray}
          styles={GlobalStyles.marginVerticalMedium}
          onChangeText={() => handleChange()}
        />
        <Text
          bold
          size={Fonts.size.font11}
          text="Password"
          textColor={Colors.Gray}
          styles={[GlobalStyles.marginTopSmall, GlobalStyles.alignItemsLeft]}
        />
        <Input
          fieldType="password"
          placeholder="Please enter your password"
          textColor={Colors.DarkerGray}
          styles={GlobalStyles.marginVerticalMedium}
          onChangeText={() => handleChange()}
        />
        <Button
          onClick={handleLogin}
          buttonType="fill"
          text="Login"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.05}
          width={Dimensions.Width * 0.9}
          style={GlobalStyles.marginVerticalMedium}
        />
      </View>
      <View style={styles.rowItems}>
        <TouchableOpacity>
          <Text
            size={Fonts.size.font11}
            text="Forgot Password?"
            textColor={Colors.Gray}
            styles={[GlobalStyles.marginTopSmall, GlobalStyles.alignItemsLeft]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.alignFooter}>
        <Text
          size={Fonts.size.font11}
          text="Don't have an account? "
          textColor={Colors.Gray}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text
            size={Fonts.size.font11}
            bold
            text="Sign up"
            textColor={Colors.Gray}
          />
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default Login;
const styles = StyleSheet.create({
  rowItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Dimensions.Width * 0.06,
  },
  alignFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text, Wrapper} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions, GlobalStyles} from '../../../utils/constants';
import Images from '../../../utils/media';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Login');
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
            text="Sign up!"
            bold
            textColor={Colors.Primary}
            styles={GlobalStyles.marginTopLarge}
          />
          <Text
            size={Fonts.size.font11}
            text="Enter your details to sign up to Budget Buddy"
            textColor={Colors.Gray}
            styles={GlobalStyles.marginVerticalSmall}
          />
        </View>
        <Text
          bold
          size={Fonts.size.font11}
          text="Name"
          textColor={Colors.Gray}
          styles={[GlobalStyles.marginTopSmall, GlobalStyles.alignItemsLeft]}
        />
        <Input
          fieldType="name"
          placeholder="Please enter your name"
          textColor={Colors.DarkerGray}
          styles={GlobalStyles.marginVerticalMedium}
          onChangeText={() => handleChange()}
        />
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
          onClick={handleRegister}
          buttonType="fill"
          text="Register"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.05}
          width={Dimensions.Width * 0.9}
          style={GlobalStyles.marginVerticalMedium}
        />
      </View>

      <View style={styles.alignFooter}>
        <Text
          size={Fonts.size.font11}
          text="Already have an account? "
          textColor={Colors.Gray}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            size={Fonts.size.font11}
            bold
            text="Sign in"
            textColor={Colors.Gray}
          />
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default Register;
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

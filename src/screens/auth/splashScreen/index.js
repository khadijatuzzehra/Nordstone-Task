/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Animated, Easing} from 'react-native';
import Images from '../../../utils/media';
import {Dimensions} from '../../../utils/constants';
import {Colors} from '../../../theme';
const SplashScreen = () => {
  const [fadeOutAnim] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.inOut(Easing.elastic(1)),
      useNativeDriver: false,
    }).start(() => {
      console.log('bye');
    });
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 2000);
  }, [fadeOutAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeOutAnim}]}>
      <Image source={Images.Logo} style={styles.logoImage} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black,
  },
  logoImage: {
    width: Dimensions.Width / 2,
    height: Dimensions.Width / 2,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

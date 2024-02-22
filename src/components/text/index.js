import React from 'react';
import {Text as T} from 'react-native';
import {Fonts, Colors} from '../../theme';

const Text = ({text, textColor = Colors.Black, bold, size, styles}) => {
  const textStyle = {
    fontFamily: bold ? Fonts.family.bold : Fonts.family.regular,
    fontSize: size,
    color: textColor,
  };

  return <T style={[styles, textStyle]}>{text}</T>;
};

export default Text;

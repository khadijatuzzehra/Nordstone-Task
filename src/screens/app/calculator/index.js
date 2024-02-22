import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button, Wrapper, Dropdown} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';

const Calculator = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const buttonController = async () => {
    console.log('hey');
  };
  const handleChange = textReceived => {
    setText(textReceived);
    console.log(textReceived);
  };
  const items = ['Addition (+)', 'Subtraction (-)', 'Multiplication (*)'];
  return (
    <Wrapper>
      <View style={styles.container}>
        <Text
          text={'Calculator'}
          bold
          textColor={Colors.Primary}
          size={Fonts.size.font18}
          styles={styles.center}
        />
        <Text
          text={'First number'}
          bold
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <Input
          fieldType="number"
          placeholder="Enter first number"
          height={Dimensions.Height * 0.06}
          width={Dimensions.Width * 0.9}
          textColor={Colors.DarkerGray}
          onChangeText={txt => handleChange(txt)}
        />
        <Text
          text={'Second number'}
          bold
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <Input
          fieldType="number"
          placeholder="Enter second number"
          height={Dimensions.Height * 0.06}
          width={Dimensions.Width * 0.9}
          textColor={Colors.DarkerGray}
          onChangeText={txt => handleChange(txt)}
        />
        <Text
          text={'Operation'}
          bold
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.dropdown}>
          <Text
            text={'Select operation'}
            textColor={Colors.Gray}
            styles={styles.gap}
          />
        </TouchableOpacity>
        <Dropdown
          items={items}
          heading="Operation"
          onSelect={buttonController}
          onCancel={() => setOpen(false)}
          open={open}
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
          style={styles.center}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Dimensions.Height * 0.12,
    marginHorizontal: Dimensions.Width * 0.04,
  },
  title: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    width: Dimensions.Width,
    marginBottom: Dimensions.Height * 0.02,
  },
  gap: {
    marginVertical: Dimensions.Height * 0.01,
  },
  center: {
    marginVertical: Dimensions.Height * 0.03,
    alignSelf: 'center',
  },
  dropdown: {
    height: Dimensions.Height * 0.06,
    width: Dimensions.Width * 0.9,
    borderColor: Colors.Gray,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 5,
  },
});

export default Calculator;

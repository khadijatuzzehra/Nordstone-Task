import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  Input,
  Button,
  Wrapper,
  Dropdown,
  Alert,
  Loader,
} from '../../../components';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from '../../../utils/constants';
import {useForm, Controller} from 'react-hook-form';
import {useAxios} from '../../../utils/api';

const Calculator = () => {
  const [op, setOp] = useState('');
  const {post} = useAxios();
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const buttonController = async data => {
    if (!op) {
      setAlertTitle('Try again');
      setAlertDescription('Please select an operation');
      setVisible(true);
    } else {
      setLoading(true);
      let params = {
        firstNumber: data.firstNumber,
        secondNumber: data.secondNumber,
        operation: op,
      };
      post('calculate/perform', params, false, {
        success: async res => {
          setLoading(false);
          setAlertTitle('Success!');
          setAlertDescription(res);
          setVisible(true);
        },
        error: async error => {
          setLoading(false);
          setAlertTitle('Try again');
          setAlertDescription('Server error ' + error);
          setVisible(true);
        },
      });
      setReset(true);
      setOp('');
    }
  };
  if (loading) {
    return <Loader />;
  }

  const items = ['Addition', 'Subtraction', 'Multiplication'];
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
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              fieldType="number"
              multiline={false}
              placeholder="Enter the first number"
              width={Dimensions.Width * 0.9}
              textColor={Colors.DarkerGray}
              onChangeText={txt => {
                onChange(txt);
                setReset(false);
              }}
              reset={reset}
            />
          )}
          name="firstNumber"
          rules={{
            required: 'Number is required',
            minLength: {
              value: 1,
              message: 'Number must contain atleast 1 digit',
            },
          }}
        />
        {errors.firstNumber && (
          <Text
            text={errors.firstNumber.message}
            textColor={Colors.DangerColor}
          />
        )}

        <Text
          text={'Second number'}
          bold
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              fieldType="number"
              multiline={false}
              placeholder="Enter the second number"
              width={Dimensions.Width * 0.9}
              textColor={Colors.DarkerGray}
              onChangeText={txt => {
                onChange(txt);
                setReset(false);
              }}
              reset={reset}
            />
          )}
          name="secondNumber"
          rules={{
            required: 'Number is required',
            minLength: {
              value: 1,
              message: 'Number must contain atleast 1 digit',
            },
          }}
        />
        {errors.secondNumber && (
          <Text
            text={errors.secondNumber.message}
            textColor={Colors.DangerColor}
          />
        )}
        <Text
          text={'Operation'}
          bold
          textColor={Colors.Gray}
          styles={styles.gap}
        />
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.dropdown}>
          {op === '' ? (
            <Text
              text={'Select operation'}
              textColor={Colors.Gray}
              styles={styles.gap}
            />
          ) : (
            <Text text={op} textColor={Colors.Gray} styles={styles.gap} />
          )}
        </TouchableOpacity>
        <Dropdown
          items={items}
          heading="Operation"
          onSelect={val => setOp(val)}
          onCancel={() => setOpen(false)}
          open={open}
        />
        <Button
          onClick={handleSubmit(buttonController)}
          buttonType="fill"
          text="Submit"
          backgroundColor={Colors.Primary}
          textColor={Colors.White}
          bold
          height={Dimensions.Height * 0.05}
          width={Dimensions.Width * 0.8}
          style={styles.center}
        />
        <Alert
          heading={alertTitle}
          isVisible={visible}
          description={alertDescription}
          iconName="notifications"
          iconColor={Colors.Primary}
          onCancel={() => setVisible(false)}
          button={'OK'}
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
    padding: 5,
  },
});

export default Calculator;

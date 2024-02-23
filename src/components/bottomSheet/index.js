import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalStyles, Dimensions} from '../../utils/constants';
import {Colors} from '../../theme';

const BottomSheet = ({
  onCancel,
  isVisible,
  children,
  backgroundColor = Colors.White,
}) => {
  const backDropPress = () => {
    onCancel('');
  };
  const modalBackground = {
    backgroundColor,
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={backDropPress}
      onSwipeComplete={backDropPress}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.8}
      transparent={true}
      style={styles.modalContainer}>
      <View
        style={[modalBackground, styles.modalContent]}
        scrollEnabled={false}>
        <View
          style={[
            GlobalStyles.bottomSheetHeader,
            GlobalStyles.marginVerticalLarge,
          ]}
        />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 60,
    height: Dimensions.Height * 0.5,
    borderTopRightRadius: 60,
    paddingHorizontal: Dimensions.Width * 0.1,
  },
  optionContainer: {
    justifyContent: 'space-evenly',
  },
  option: {
    alignItems: 'center',
  },
});

export default BottomSheet;

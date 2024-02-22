import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '../../../components';
import {Images} from '../../../utils/media';
import {Colors, Fonts} from '../../../theme';
import {Dimensions, Data} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const [showNextButton, setShowNextButton] = useState(true);
  const data = Data.onboardingData;
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onComplete = () => {
    navigation.navigate('Login');
  };
  const handlePress = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    if (nextIndex === 0) {
      onComplete();
    } else {
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
      setShowNextButton(false);
      setTimeout(() => {
        setShowNextButton(true);
      }, 200);
    }
  };
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.Width);
    setCurrentIndex(index);
  };
  const renderItem = ({item, index}) => {
    const containerStyle = [
      styles.listContainer,
      index !== data.length - 1 && styles.firstItem,
      index === data.length - 1 && styles.lastItem,
    ];

    let ImageComponent = null;

    switch (item.image) {
      case 'Onboarding1':
        ImageComponent = (
          <Image source={Images.appImages.Onboarding1} style={styles.image} />
        );
        break;
      case 'Onboarding2':
        ImageComponent = (
          <Image source={Images.appImages.Onboarding2} style={styles.image} />
        );
        break;
      case 'Onboarding3':
        ImageComponent = (
          <Image source={Images.appImages.Onboarding3} style={styles.image} />
        );
        break;
      default:
        ImageComponent = null;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={containerStyle}>
          <View style={styles.imageContainer}>{ImageComponent}</View>
          <Text
            bold
            size={Fonts.size.font20}
            text={item.heading}
            textColor={Colors.Gray}
            styles={styles.text}
          />

          {item.image === 'Onboarding1' && (
            <Image
              source={Images.appImages.ProgressBar1}
              style={styles.progressBar}
            />
          )}
          {item.image === 'Onboarding2' && (
            <Image
              source={Images.appImages.ProgressBar2}
              style={styles.progressBar}
            />
          )}
          {item.image === 'Onboarding3' && (
            <Image
              source={Images.appImages.ProgressBar3}
              style={styles.progressBar}
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={Data.onboardingData}
        renderItem={renderItem}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onClick={handlePress}
            buttonType="fill"
            text="Next"
            backgroundColor={Colors.Primary}
            textColor={Colors.White}
            bold
            height={Dimensions.Height * 0.05}
            width={Dimensions.Width * 0.7}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Dimensions.Height / 10,
    paddingHorizontal: Dimensions.Width / 200,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginHorizontal: Dimensions.Width / 8,
  },
  text: {width: Dimensions.Width * 0.7, textAlign: 'center'},
  firstItem: {
    marginLeft: Dimensions.Width / 7,
  },
  lastItem: {
    marginHorizontal: Dimensions.Width / 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.Height / 10,
    marginBottom: Dimensions.Height / 5,
    height: Dimensions.Height / 50,
    width: Dimensions.Width / 50,
  },
  progressBar: {
    marginTop: Dimensions.Height / 30,
  },
  bottomContainer: {
    height: Dimensions.Height / 5,
    paddingHorizontal: Dimensions.Width / 30,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: Dimensions.Height / 20,
  },

  image: {
    height: Dimensions.Height / 3,
    width: Dimensions.Width / 1.5,
    resizeMode: 'contain',
    marginBottom: Dimensions.Height / 10,
  },
});

export default OnBoarding;

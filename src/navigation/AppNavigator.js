/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import PictureUpload from '../screens/app/pictureUpload';
import Notification from '../screens/app/notification';
import TextUpload from '../screens/app/textUpload';
import Calculator from '../screens/app/calculator';
import Colors from '../theme/colors/Colors';

const NotificationStack = createNativeStackNavigator();
const NotificationStackScreens = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name={'Notification'}
      component={Notification}
      options={{headerShown: false}}
    />
  </NotificationStack.Navigator>
);

const PictureStack = createNativeStackNavigator();
const PictureStackScreens = () => (
  <PictureStack.Navigator>
    <PictureStack.Screen
      name={'PictureUpload'}
      component={PictureUpload}
      options={{
        headerShown: false,
      }}
    />
  </PictureStack.Navigator>
);

const TextStack = createNativeStackNavigator();
const TextStackScreens = () => (
  <TextStack.Navigator>
    <TextStack.Screen
      name={'TextUpload'}
      component={TextUpload}
      options={{
        headerShown: false,
      }}
    />
  </TextStack.Navigator>
);
const CalculatorStack = createNativeStackNavigator();
const CalculatorStackScreens = () => (
  <CalculatorStack.Navigator>
    <CalculatorStack.Screen
      name={'Calculator'}
      component={Calculator}
      options={{
        headerShown: false,
      }}
    />
  </CalculatorStack.Navigator>
);
function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName === 'Announcements' || routeName === 'Announcement') {
    return 'none';
  }

  return 'flex';
}

const Tabs = createBottomTabNavigator();
export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {display: getTabBarVisibility(route)},
        tabBarActiveTintColor: Colors.Primary,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: Colors.LightSecondary,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let IconComponent = Feather;
          switch (route.name) {
            case 'NotificationStack':
              iconName = 'bell';
              break;

            case 'TextStack':
              iconName = 'type';
              break;

            case 'CalculatorStack':
              iconName = 'x-square';
              break;

            case 'PictureStack':
              iconName = 'image';
              break;
          }
          return (
            <IconComponent
              name={iconName}
              size={20}
              color={focused ? Colors.Primary : Colors.LightSecondary}
            />
          );
        },
      })}>
      <Tabs.Screen
        name={'NotificationStack'}
        options={{headerShown: false, tabBarLabel: 'Notification'}}
        component={NotificationStackScreens}
      />
      <Tabs.Screen
        name={'PictureStack'}
        options={{headerShown: false, tabBarLabel: 'Picture'}}
        component={PictureStackScreens}
      />
      <Tabs.Screen
        name={'TextStack'}
        options={{headerShown: false, tabBarLabel: 'Text'}}
        component={TextStackScreens}
      />
      <Tabs.Screen
        name={'CalculatorStack'}
        options={{headerShown: false, tabBarLabel: 'Calculator'}}
        component={CalculatorStackScreens}
      />
    </Tabs.Navigator>
  );
};

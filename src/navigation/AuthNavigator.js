import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';
// import OnBoarding from '../screens/auth/onBoarding';
import Register from '../screens/auth/register/Register';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={'Login'}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={'Register'}
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

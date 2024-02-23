import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Navigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
// import Loader from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN_SUCCESS} from '../store/actions/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../components';
import SplashScreen from '../screens/auth/splashScreen';

const Container = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      if (userInfo != null) {
        dispatch({type: LOGIN_SUCCESS, payload: JSON.parse(userInfo)});
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
    return () => {};
  }, [dispatch]);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <Navigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Container;

/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../screens/CameraScreen/index';
import Gallery from '../screens/Gallery/index';
import styles from '../assets/Styles/index';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Gallery" component={Gallery} />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;



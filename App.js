import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/index';
import styles from './src/assets/Styles/index';

function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

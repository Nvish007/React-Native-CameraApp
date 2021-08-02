/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    root: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    flashView: {
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: 10,
      marginLeft: 10,
      position: 'absolute',
    },
  });

export default styles;

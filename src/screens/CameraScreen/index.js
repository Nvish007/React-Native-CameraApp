/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './style';

const CameraScreen = (props) => {
  let cameraRef = useRef(null);
  const [cameType, setCam] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      props.navigation.navigate('Gallery', {uri: data.uri});
    }
  };

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  const switchCamera = () => {
    if (cameType === RNCamera.Constants.Type.back) {
      setCam(RNCamera.Constants.Type.front);
    } else {
      setCam(RNCamera.Constants.Type.back);
    }
  };

  const pickFromGallary = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('No Photo selected');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
       Alert.alert('Camera not available on this device');
        return;
      } else if (response.errorCode === 'permission') {
        Alert.alert('permission not satisfied');
        return;
      } else if (response.errorCode === 'other') {
       Alert.alert(response.errorMessage);
        return;
      }

      console.log('uri ->', response.uri);
      console.log('fileSize ->', response.fileSize);
      console.log('filrName ->', response.fileName);
      console.log('type ->', response.type);
      console.log('width ->', response.width);
      console.log('Height ->', response.height);
      props.navigation.navigate('Gallery', {uri: response.uri});
    });
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={cameType}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
          onPress={() => toggleFlash()}
          style={styles.flashView}>
          <Ionicons
            name={flash ? 'flash' : 'flash-off'}
            size={40}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.root}>
          <TouchableOpacity
            onPress={() => pickFromGallary('photo')}
            style={styles.capture}>
            <Icon name="picture-o" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Icon name="camera" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchCamera} style={styles.capture}>
            <Icon name="repeat" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

export default CameraScreen;



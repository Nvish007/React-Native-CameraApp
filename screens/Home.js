import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

const Home = (props) =>{
  //const [filePath, setFilePath] = useState({});


  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
          console.log(granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };


  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage write Permission',
            message: 'App needs camera permission',
          },
        );
          console.log(granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("storage permission err", err);
      }
      return false;
    } else return true;
  };


  const pickFromCamera = async(type) =>{
    let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        saveToPhotos: true,
      };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestStoragePermission();
    if(isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) =>{
        console.log(response);
        
        if (response.didCancel){
          alert("user camcelled camera");
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert("Camera not available on this device")
          return;
        } else if (response.errorCode == 'permission') {
          alert("permission not satisfied");
          return;
        } else if (response.errorCode == 'other') {
          alert(response.errorMessage);
          return;
        }

        console.log("uri ->", response.uri);
        console.log("fileSize ->", response.fileSize);
        console.log("filrName ->", response.fileName);
        console.log("type ->", response.type);
        console.log("width ->", response.width);
        console.log("Height ->", response.height);
        

      });
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

      if (response.didCancel){
        alert("user camcelled camera");
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert("Camera not available on this device")
        return;
      } else if (response.errorCode == 'permission') {
        alert("permission not satisfied");
        return;
      } else if (response.errorCode == 'other') {
        alert(response.errorMessage);
        return;
      }

      console.log("uri ->", response.uri);
      console.log("fileSize ->", response.fileSize);
      console.log("filrName ->", response.fileName);
      console.log("type ->", response.type);
      console.log("width ->", response.width);
      console.log("Height ->", response.height);
      
    });
  };
   return(
     <View style={styles.root}>
       <View>
       <Text style={styles.textView}>Select the Image</Text>
        <View style={styles.buttonview}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate("CameraScreen")}>
          <Text style={styles.textStyle}>
            Click image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => pickFromGallary('photo')}>
          <Text style={styles.textStyle}>
            Gallary
          </Text>
        </TouchableOpacity>
        </View>
       </View>
     </View>
   )
}

export default Home

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10
  },
  textView:{
  fontSize:20,
  color:"#000",
  marginLeft:30,
  marginBottom:10
  },
  buttonview:{
    flexDirection:"column",
  },
  button:{
    marginLeft:50,
    paddingLeft:50
  },
  textStyle: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
})
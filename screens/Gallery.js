import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

function Gallery(props){
    return(
      <View>
      <Image style={{width:120, height:120}} 
        source={{uri:props.route.params.uri}} />
      </View>
    )
}

export default Gallery;
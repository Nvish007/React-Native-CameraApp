/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image} from 'react-native';

function Gallery(props) {
  return (
    <View>
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 120, height: 120}}
        source={{uri: props.route.params.uri}}
      />
    </View>
  );
}

export default Gallery;

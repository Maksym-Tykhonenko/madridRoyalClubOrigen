import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

const Layaut = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground style={{flex: 1, backgroundColor: '#1d2e48'}}>
        {children}
      </ImageBackground>
    </View>
  );
};
//source={}
export default Layaut;

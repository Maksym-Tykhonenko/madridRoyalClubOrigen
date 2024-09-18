import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Map = ({latitude, longitude}) => {
  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      />
    </MapView>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    marginBottom: 10,
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
  },
});

export default Map;

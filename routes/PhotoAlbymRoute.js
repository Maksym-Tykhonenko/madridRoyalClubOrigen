import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Layaut from '../components/Layaut';
import {COLORS} from '../constants/Colors';
import PhotoAlbymScreen from '../screens/PhotoAlbym/PhotoAlbymScreen';

const PhotoAlbymRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PhotoAlbymScreen" component={PhotoAlbymScreen} />
    </Stack.Navigator>
  );
};

export default PhotoAlbymRoute;

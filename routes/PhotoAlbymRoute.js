import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Layaut from '../components/Layaut';
import {COLORS} from '../constants/Colors';
import PhotoAlbymScreen from '../screens/PhotoAlbym/PhotoAlbymScreen';
import OnePhotoAlbymScreen from '../screens/PhotoAlbym/OnePhotoAlbymScreen';

const PhotoAlbymRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PhotoAlbymScreen" component={PhotoAlbymScreen} />
      <Stack.Screen
        name="OnePhotoAlbymScreen"
        component={OnePhotoAlbymScreen}
      />
    </Stack.Navigator>
  );
};

export default PhotoAlbymRoute;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ArticlScreen from '../screens/Articl/ArticlScreen';
import OneArticlScreen from '../screens/Articl/OneArticlScreen';

const ArticlRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ArticlScreen" component={ArticlScreen} />
      <Stack.Screen name="OneArticlScreen" component={OneArticlScreen} />
    </Stack.Navigator>
  );
};

export default ArticlRoute;

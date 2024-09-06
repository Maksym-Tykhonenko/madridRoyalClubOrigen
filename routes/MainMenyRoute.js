import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//const Tab = createBottomTabNavigator();
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeMainMenyScreen from '../screens/MainMeny/HomeMainMenyScreen';
import ProfileScreen from '../screens/MainMeny/ProfileScreen';
import DailyQuizScreen from '../screens/MainMeny/DailyQuizScreen';

function MainMenyRoute({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMainMenyScreen" component={HomeMainMenyScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DailyQuizScreen" component={DailyQuizScreen} />
    </Stack.Navigator>
  );
}

export default MainMenyRoute;

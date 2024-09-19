import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Layaut from '../components/Layaut';
import {COLORS} from '../constants/Colors';
import SetingsScreen from '../screens/Setings/SetingsScreen';

const SetingsRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SetingsScreen" component={SetingsScreen} />
    </Stack.Navigator>
  );
};

export default SetingsRoute;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ToursToMadridScreen from '../screens/ToursToMadrid/ToursToMadridScreen';

const ToursToMadridRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ToursToMadridScreen"
        component={ToursToMadridScreen}
      />
    </Stack.Navigator>
  );
};

export default ToursToMadridRoute;

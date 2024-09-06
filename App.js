import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import MainMenyRoute from './routes/MainMenyRoute';

//////////////////////////////////////////////////////////////////////////
function ToursToMadridRoute() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ToursToMadridRoute!!!</Text>
    </View>
  );
}

function PhotoAlbymRoute() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>PhotoAlbymRoute!!!</Text>
    </View>
  );
}

function ArticlRoute() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ArticlRoute!!!</Text>
    </View>
  );
}

function SetingsRoute() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SetingsRoute!!!</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="MainMenyRoute" component={MainMenyRoute} />
        <Tab.Screen name="ToursToMadridRoute" component={ToursToMadridRoute} />
        <Tab.Screen name="PhotoAlbymRoute" component={PhotoAlbymRoute} />
        <Tab.Screen name="ArticlRoute" component={ArticlRoute} />
        <Tab.Screen name="SetingsRoute" component={SetingsRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeMainMenyScreen from '../screens/MainMeny/HomeMainMenyScreen';
import ProfileScreen from '../screens/MainMeny/ProfileScreen';
import DailyQuizScreen from '../screens/MainMeny/DailyQuizScreen';
import QuizeScreen from '../screens/MainMeny/QuizScreen';
import LeaderBoardScreen from '../screens/MainMeny/LeaderBoardScreen';
import AboutUsScreen from '../screens/MainMeny/AboutUsScreen';
import QuizeHardLvlScreen from '../screens/MainMeny/QuizeHardLvlScreen';

function MainMenyRoute({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMainMenyScreen" component={HomeMainMenyScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DailyQuizScreen" component={DailyQuizScreen} />
      <Stack.Screen name="QuizeScreen" component={QuizeScreen} />
      <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="QuizeHardLvlScreen" component={QuizeHardLvlScreen} />
    </Stack.Navigator>
  );
}

export default MainMenyRoute;

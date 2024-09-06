import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const HomeMainMenyScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HomeMainMenyScreen!!!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}>
        <Text>Go to ProfileScreen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DailyQuizScreen');
        }}>
        <Text>Go to DailyQuizScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMainMenyScreen;

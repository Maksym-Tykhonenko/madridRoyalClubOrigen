import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';

const DailyQuizScreen = ({navigation}) => {
  return (
    <Layaut>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: COLORS.primaryText}}>DailyQuizScreen!!!</Text>
      </View>
    </Layaut>
  );
};

export default DailyQuizScreen;

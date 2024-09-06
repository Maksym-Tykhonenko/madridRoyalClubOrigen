import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Layaut from '../components/Layaut';
import {COLORS} from '../constants/Colors';

const SetingsRoute = () => {
  return (
    <Layaut>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: COLORS.primaryText}}>SetingsRoute!!!</Text>
      </View>
    </Layaut>
  );
};

export default SetingsRoute;

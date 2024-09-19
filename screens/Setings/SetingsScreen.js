import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetingsScreen = () => {
  const [vibroStatus, setVibroStatus] = useState(false);
  return (
    <Layaut>
      <View style={{flex: 1, paddingTop: 50}}>
        <View style={{width: windowWidth, alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.primaryText,
              fontFamily: FONTS.primary,
              fontSize: 60,
            }}>
            Settings:
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 80}}>
          <Text
            style={{
              color: COLORS.primaryText,
              fontFamily: FONTS.primary,
              fontSize: 40,
              marginLeft: 20,
            }}>
            -Vibratons
          </Text>

          <TouchableOpacity
            onPress={() => {
              setVibroStatus(!vibroStatus);
            }}
            style={{
              //width: 50,
              //height: 50,
              //borderWidth: 3,
              //borderColor: COLORS.primaryText,
              marginLeft: 20,
              //alignItems: 'center',
              //justifyContent: 'center',
            }}>
            <Image
              style={{width: 50, height: 50, marginBottom: 20}}
              source={
                vibroStatus
                  ? require('../../assets/icons/cross_17735556.png')
                  : require('../../assets/icons/check-mark_12503645.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layaut>
  );
};

export default SetingsScreen;

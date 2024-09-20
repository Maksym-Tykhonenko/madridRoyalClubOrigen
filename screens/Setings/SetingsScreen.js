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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetingsScreen = () => {
  const [vibroStatus, setVibroStatus] = useState(true);
  console.log('vibroStatus==>', vibroStatus);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [vibroStatus]);

  const setData = async () => {
    try {
      const data = {
        vibroStatus,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`Vibration`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`Vibration`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setVibroStatus(parsedData.vibroStatus);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

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
              marginLeft: 20,
            }}>
            <Image
              style={{width: 50, height: 50, marginBottom: 20}}
              source={
                !vibroStatus
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

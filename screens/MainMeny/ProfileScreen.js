import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import BtnBack from '../../components/BtnBack';
import OperationBtn from '../../components/OperationBtn';
import Foundation from 'react-native-vector-icons/Foundation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [prevName, setPrevName] = useState('');
  const [name, setName] = useState('');
  const [score, setScore] = useState(null);
  console.log('score==>', score);
  console.log('Name==>', name);

  useEffect(() => {
    getData();
    getScoreData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectAvatar, name]);

  const setData = async () => {
    try {
      const data = {
        selectAvatar,
        name,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setName(parsedData.name);
        setSelectAvatar(parsedData.selectAvatar);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const getScoreData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`Score`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        setScore(parsedData.score || 0); // Якщо немає балів, ставимо за замовчуванням 0
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
      setScore(0);
    }
  };

  const SelectAvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const SaveName = () => {
    if (prevName === '') {
      alert('Please enter your name...');
      return;
    }
    setName(prevName);
    setPrevName('');
  };

  const ResetData = () => {
    setSelectAvatar(null);
    setName('');
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Layaut>
      <View style={styles.conteiner}>
        <Text style={styles.subtitle}>Avatar</Text>

        {/**Avatar */}
        <TouchableOpacity
          onPress={() => {
            SelectAvatarPicer();
          }}>
          {selectAvatar ? (
            <View style={{marginTop: 20}}>
              <Image source={{uri: selectAvatar}} style={styles.avatar} />
            </View>
          ) : (
            <Foundation
              name="social-picasa"
              style={{
                fontSize: 250,
                color: '#FFD700',
              }}
            />
          )}
        </TouchableOpacity>

        {!name ? (
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Nickname..."
              placeholderTextColor="rgba(255, 215, 0, 0.5)"
              style={styles.TextInputStyles}
              onChangeText={setPrevName}
              value={prevName}
            />

            <OperationBtn foo={SaveName} title="Save" />
          </View>
        ) : (
          <View style={styles.nameConteiner}>
            <Text style={{...styles.subtitle, fontSize: 35}}>Name:</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        )}
        {selectAvatar || name ? (
          <OperationBtn
            foo={ResetData}
            title="Reset"
            castomeStyles={{position: 'absolute', bottom: 5, left: 5}}
          />
        ) : (
          <></>
        )}

        {score && (
          <View style={styles.nameConteiner}>
            <Text style={{...styles.subtitle, fontSize: 35}}>Score:</Text>
            <Text style={styles.name}>{score}</Text>
          </View>
        )}

        <OperationBtn
          foo={goBack}
          title="Back"
          castomeStyles={{position: 'absolute', bottom: 5, right: 5}}
        />
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    position: 'relative',
  },
  subtitle: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderColor: COLORS.primaryText,
    borderWidth: 3,
  },
  nameConteiner: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  name: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 60,
  },
  TextInputStyles: {
    height: 60,
    width: windowWidth * 0.9,
    margin: 12,
    padding: 10,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    borderRadius: 50,
    backgroundColor: '#383420',
    color: COLORS.primaryText,
    fontSize: 30,
    fontFamily: 'Starnberg',
  },
  btn: {
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: COLORS.primaryTextTransparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnReset: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: COLORS.primaryTextTransparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {color: COLORS.primary, fontFamily: FONTS.primary, fontSize: 27},
});

export default ProfileScreen;

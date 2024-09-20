import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {liderdoardData} from '../../data/liderdoardData';
import OperationBtn from '../../components/OperationBtn';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const LeaderBoardScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [score, setScore] = useState(null);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getProfileScreenData();
    getScoreData();
  }, []);

  const getProfileScreenData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        setName(parsedData.name || '---'); // Якщо немає імені, ставимо за замовчуванням '---'
        setSelectAvatar(
          parsedData.selectAvatar || '../../assets/localResidents/777.png',
        ); // Якщо немає аватара, ставимо стандартний
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
      setName('---');
      setSelectAvatar('../../assets/localResidents/777.png');
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

  useEffect(() => {
    let updatedLeaders = [...Object.values(liderdoardData)]; // Додаємо існуючих лідерів

    // Додаємо користувача власника, тільки якщо у нього є значення score
    if (score !== null) {
      const ownerData = {
        name: name ? name : '---', // Перевіряємо на порожнє значення
        score: score,
        photo: selectAvatar
          ? {uri: selectAvatar}
          : require('../../assets/localResidents/777.png'), // Перевіряємо на порожнє значення аватара
      };

      updatedLeaders = [ownerData, ...updatedLeaders]; // Додаємо власника до списку
    }

    // Сортуємо за балами (score) в порядку спадання
    updatedLeaders.sort((a, b) => b.score - a.score);

    setLeaders(updatedLeaders);
  }, [name, score, selectAvatar]);

  const GoBack = () => {
    navigation.goBack();
  };

  return (
    <Layaut>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
        <Text style={styles.title}>Leaderboard</Text>

        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          {leaders.map((leader, index) => (
            <View key={index} style={styles.leaderContainer}>
              <Image source={leader.photo} style={styles.avatar} />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{leader.name}</Text>
                <Text style={styles.leaderScore}>Score: {leader.score}</Text>
              </View>
            </View>
          ))}
          <View style={{height: 150}}></View>
        </ScrollView>
      </View>

      <OperationBtn
        title="Back"
        castomeStyles={{position: 'absolute', bottom: 5, right: 5}}
        foo={GoBack}
      />

      {/**
       <View style={{width: windowWidth, alignItems: 'flex-end'}}>
        <OperationBtn
          title="Back"
          castomeStyles={{marginBottom: 5, marginRight: 5}}
          foo={GoBack}
        />
      </View>
       */}
    </Layaut>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 50,
    marginBottom: 20,
  },
  leaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryTextTransparent,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 20,
    fontFamily: FONTS.primary,
    color: COLORS.primary,
  },
  leaderScore: {
    fontSize: 16,
    fontFamily: FONTS.secondary,
    color: COLORS.secondaryText,
  },
});

export default LeaderBoardScreen;

{
  /**
   */
}

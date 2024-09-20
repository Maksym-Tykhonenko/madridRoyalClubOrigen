import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Vibration,
} from 'react-native';
import {Dimensions} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {hardLevelQwestions} from '../../data/hardLevelQwestions';
import OperationBtn from '../../components/OperationBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;

const QuizeHardLvlScreen = ({navigation}) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0); // Додаємо стан для збереження балів
  const [priviusModalIsVisible, setPriviusModalIsVisible] = useState(false);
  const [wrongAnsverModalIsVisible, setwrongAnsverModalIsVisible] =
    useState(false);
  const [compliteLevelModalIsVisible, setCompliteLevelModalIsVisible] =
    useState(false);
  const [vibroStatus, setVibroStatus] = useState(false);
  console.log('vibroStatus==>', vibroStatus);

  useEffect(() => {
    getData();
    getVibrationData();
  }, []);

  useEffect(() => {
    setData();
  }, [score]);

  const setData = async () => {
    try {
      const data = {
        score,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`Score`, jsonData);
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`Score`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        setScore(parsedData.score);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const getVibrationData = async () => {
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

  const levelData = hardLevelQwestions.find(level => level.id === currentLevel);

  const levelQuestions = levelData?.questions;

  useEffect(() => {
    if (!isGameOver) {
      setPriviusModalIsVisible(true);
    }
  }, [currentLevel]);

  const handleAnswer = selectedAnswer => {
    const correctAnswer =
      levelQuestions && levelQuestions[currentQuestionIndex].correctAnswer;

    // Якщо вібрація увімкнена, викликаємо вібрацію
    if (vibroStatus) {
      // 100 мс для правильної відповіді, 300 мс для неправильної
      Vibration.vibrate(isCorrect ? 100 : 300);
    }

    if (selectedAnswer === correctAnswer) {
      setScore(score + 100); // Додаємо 100 балів за правильну відповідь

      if (currentQuestionIndex + 1 < levelQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentLevel < 10) {
        setCompliteLevelModalIsVisible(true);
      } else {
        setIsGameOver(true);
        Alert.alert(
          'You Win!',
          'Congratulations, you have completed all levels!',
        );
      }
    } else {
      setwrongAnsverModalIsVisible(true);
    }
  };

  const GoBack = () => {
    navigation.navigate('HomeMainMenyScreen');
  };

  const ClosePriviusModal = () => {
    setPriviusModalIsVisible(false);
  };

  const WrongAnswerModalClose = () => {
    setwrongAnsverModalIsVisible(false);
    navigation.navigate('HomeMainMenyScreen');
  };

  const CompleteLvlModalClose = () => {
    setCompliteLevelModalIsVisible(false);
    setCurrentLevel(currentLevel + 1);
    setCurrentQuestionIndex(0);
  };

  return (
    <Layaut>
      <View style={{flex: 1, paddingTop: 40}}>
        <ScrollView>
          <View style={styles.container}>
            {!isGameOver && levelQuestions && (
              <>
                <View style={{width: windowWidth, alignItems: 'flex-start'}}>
                  <Text style={styles.myScore}>My score: {score}</Text>
                </View>

                {/* Рендеринг заголовка рівня */}
                <Text style={styles.levelTitle}>{levelData?.title}</Text>

                <Text style={styles.questionText}>
                  {levelQuestions[currentQuestionIndex].quest}
                </Text>
                {levelQuestions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleAnswer(option)}>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ),
                )}
              </>
            )}

            {isGameOver && (
              <Text style={styles.congratulationsText}>
                Congratulations! You have completed all levels!
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal Privius */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={priviusModalIsVisible}>
        <View style={styles.conteinerModal}>
          <Text style={styles.modalText}>Welcome</Text>
          <Text style={styles.modalText}>You are on Level {currentLevel}</Text>
          <OperationBtn
            title="Ok"
            foo={ClosePriviusModal}
            castomeStyles={{marginTop: 40}}
          />
        </View>
      </Modal>

      {/* Modal Wrong answer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={wrongAnsverModalIsVisible}>
        <View style={styles.conteinerModal}>
          <Text style={styles.modalText}>Wrong Answer</Text>
          <Text style={styles.modalText}>Try again!</Text>
          <OperationBtn
            title="Ok"
            foo={WrongAnswerModalClose}
            castomeStyles={{marginTop: 40}}
          />
        </View>
      </Modal>

      {/* Modal complite Leve */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={compliteLevelModalIsVisible}>
        <View>
          <ScrollView>
            <View style={styles.conteinerModalComplite}>
              <Text style={styles.modalText}>Congrat!</Text>
              <Text style={styles.modalText}>
                You have completed Level {currentLevel}. Do you want to proceed
                to Level {currentLevel + 1}?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.9,
                  justifyContent: 'space-around',
                  paddingBottom: 20,
                }}>
                <OperationBtn
                  title="Back"
                  foo={GoBack}
                  castomeStyles={{marginTop: 40, width: 120}}
                />
                <OperationBtn
                  title="Ok"
                  foo={CompleteLvlModalClose}
                  castomeStyles={{marginTop: 40, width: 120}}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{height: 250}}></View>
        </View>
      </Modal>

      {/* BTN Back */}
      <View style={{width: windowWidth, alignItems: 'flex-end'}}>
        <OperationBtn
          foo={GoBack}
          title="Back"
          castomeStyles={{width: 120, marginBottom: 5, marginRight: 5}}
        />
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  myScore: {
    fontSize: 25,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    marginBottom: 20,
    marginLeft: 30,
    textAlign: 'center',
  },
  levelTitle: {
    fontSize: 30,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 35,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: COLORS.primaryTextTransparent,
    paddingVertical: 15,
    marginVertical: 10,
    width: windowWidth * 0.8,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
  },
  optionText: {
    fontSize: 25,
    color: COLORS.primary,
    fontFamily: FONTS.primary,
  },
  congratulationsText: {
    fontSize: 26,
    color: COLORS.success,
    textAlign: 'center',
  },
  conteinerModal: {
    backgroundColor: COLORS.primary,
    flex: 1,
    marginVertical: '50%',
    marginHorizontal: '5%',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: {width: 30, height: 10},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    elevation: 5,
    alignItems: 'center',
  },
  conteinerModalComplite: {
    backgroundColor: COLORS.primary,
    flex: 1,
    marginVertical: '10%',
    marginHorizontal: '5%',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: {width: 30, height: 10},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 40,
    fontSize: 55,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    textAlign: 'center',
  },
});

export default QuizeHardLvlScreen;

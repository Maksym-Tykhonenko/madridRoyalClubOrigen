import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Vibration,
  Modal,
} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
///////////////////
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import ModalQuizeScreen from '../../components/ModalQuizeScreen';
import {qwestionFromMadridPiple} from '../../data/qwestionFromMadridPiple';
import OperationBtn from '../../components/OperationBtn';
import ModalInstruction from '../../components/ModalInstruction';
import OperationModal from '../../components/OperationModal';
import ModalWin from '../../components/ModalWin';

const QuizeScreen = ({navigation}) => {
  const [instructionModalStatus, setInstructionModalStatus] = useState(true); // Статус модалки з інструкцією
  const [modalStatus, setModalStatus] = useState(false); // Статус модального вікна з питанням
  const [luseModalStatus, setLuseModalStatus] = useState(false);
  const [winModalStatus, setWinModalStatus] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Індекс поточного питання
  const [showAnswers, setShowAnswers] = useState(false); // Чи показувати відповіді
  const [score, setScore] = useState(0); // Додаємо стан для збереження балів
  console.log('score==>', score);
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

  const currentQuestion = qwestionFromMadridPiple[currentQuestionIndex];

  // Закриття модалки з інструкцією та відкриття модалки з питанням
  const closeInstructionModal = () => {
    setInstructionModalStatus(false);
    setModalStatus(true); // Відкриваємо основну модалку з питанням
  };

  // Закриття модалки з питанням та відображення відповідей
  const closeQwestion = () => {
    setModalStatus(false);
    setShowAnswers(true);
  };

  // Функція вибору відповіді
  const handleAnswer = isCorrect => {
    // Якщо вібрація увімкнена, викликаємо вібрацію
    if (vibroStatus) {
      // 100 мс для правильної відповіді, 300 мс для неправильної
      Vibration.vibrate(isCorrect ? 100 : 300);
    }

    if (isCorrect) {
      setScore(score + 100); // Нарахування балів за правильну відповідь
      if (currentQuestionIndex + 1 < qwestionFromMadridPiple.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Перехід до наступного питання
        setModalStatus(true); // Знову відкриваємо модалку з питанням
        setShowAnswers(false); // Приховуємо відповіді
      } else {
        setWinModalStatus(true);
        //Alert.alert('Вітаємо!', 'Ви пройшли всі питання!');
        //navigation.goBack(); // Повернення до попереднього екрану
      }
    } else {
      setLuseModalStatus(true);
      //Alert.alert('Невірно!', 'Спробуйте ще раз.');
      //navigation.goBack(); // Повернення до попереднього екрану
    }
  };

  // Повернення назад
  const GoBack = () => {
    navigation.goBack();
  };

  const GoToHardLevl = () => {
    setWinModalStatus(false);
    navigation.navigate('QuizeHardLvlScreen');
  };

  return (
    <Layaut>
      <View style={styles.container}>
        <View style={{alignItems: 'flex-start', width: windowWidth}}>
          <Text style={styles.scoreText}>My score: {score}</Text>
        </View>

        <Text style={styles.questionText}>Select one image</Text>

        {showAnswers ? (
          <View style={styles.answersContainer}>
            {currentQuestion.optionsAnswers.map((answer, index) => (
              <TouchableOpacity
                style={styles.answerBtn}
                key={index}
                onPress={() => handleAnswer(answer.isCorrect)}>
                <Image source={answer.option} style={styles.answerImage} />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.backButtonContainer}>
        <OperationBtn
          title="Back"
          castomeStyles={styles.backButton}
          foo={GoBack}
        />
      </View>

      {/* Модалка з інструкцією*/}
      <ModalInstruction
        instructionModalStatus={instructionModalStatus}
        closeInstructionModal={closeInstructionModal}
      />

      {/* Основна модалка з питанням */}
      <ModalQuizeScreen
        modalStatus={modalStatus}
        supportBtnFoo={closeQwestion}
        localResident={currentQuestion.localResident}
        question={currentQuestion.qwestion}
      />

      {/**Luse modal */}
      <OperationModal modalStatus={luseModalStatus} supportBtnFoo={GoBack} />

      {/**Win modal */}
      <ModalWin
        modalStatus={winModalStatus}
        supportBtnFoo={GoBack}
        winBtnFoo={GoToHardLevl}
      />
    </Layaut>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  questionText: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 35,
  },
  answersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  answerBtn: {
    borderRadius: 150,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: {width: 20, height: 10},
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    shadowRadius: 3,
    elevation: 5,
  },
  answerImage: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: {width: 30, height: 28},
    shadowOpacity: 0.54,
    shadowRadius: 10.32,
    shadowRadius: 3,
    elevation: 5,
    resizeMode: 'contain',
  },
  backButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  backButton: {
    width: 120,
    marginRight: 5,
  },

  scoreText: {
    fontSize: 25,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    marginLeft: 30,
    marginBottom: 10,
  },
});

export default QuizeScreen;

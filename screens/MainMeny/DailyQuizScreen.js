import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {dailyQuizQwe} from '../../data/dailyQuizQwe';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DailyQuizScreen = ({navigation}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0); // Додаємо стан для збереження балів
  const currentQuestion = dailyQuizQwe[currentQuestionIndex];

  const handleAnswer = answerIndex => {
    // Додаємо вибрану відповідь до масиву
    setSelectedOrder([...selectedOrder, answerIndex]);

    // Додаємо відповідь до масиву вибраних
    setSelectedAnswers([...selectedAnswers, answerIndex]);

    // Перевіряємо, чи усі відповіді були вибрані
    if (selectedOrder.length + 1 === currentQuestion.correctOrder.length) {
      const isCorrect = selectedOrder
        .concat(answerIndex)
        .every((val, index) => val === currentQuestion.correctOrder[index]);

      if (isCorrect) {
        // Додаємо 100 балів за правильну відповідь
        setScore(prevScore => prevScore + 100);

        if (currentQuestionIndex + 1 < dailyQuizQwe.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1); // Наступне питання
          setSelectedOrder([]); // Очищаємо вибраний масив для наступного питання
          setSelectedAnswers([]); // Очищаємо вибраний масив відповідей
        } else {
          Alert.alert(
            'Вітаємо!',
            `Ви пройшли всі питання! Ваш результат: ${score + 100} балів`,
          );
          setCurrentQuestionIndex(0); // Почати з початку
          setSelectedOrder([]);
          setSelectedAnswers([]);
          setScore(0); // Очищаємо бали після завершення
        }
      } else {
        Alert.alert('Невірно', 'Спробуйте ще раз!');
        setSelectedOrder([]); // Скидаємо вибраний масив
        setSelectedAnswers([]); // Скидаємо вибраний масив відповідей
      }
    }
  };

  return (
    <Layaut>
      <ScrollView>
        <View style={styles.container}>
          {/* Виведення поточного результату */}
          <View style={{alignItems: 'flex-start', width: windowWidth}}>
            <Text style={styles.scoreText}>My score: {score}</Text>
          </View>

          <Text style={styles.levelText}>{currentQuestion.level}</Text>
          <Text style={styles.questionText}>{currentQuestion.qwestion}</Text>

          <View style={styles.answersContainer}>
            {currentQuestion.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswers.includes(index + 1) &&
                    styles.selectedAnswerButton, // Перевіряємо, чи відповіді була натиснута
                ]}
                onPress={() => handleAnswer(index + 1)}>
                <Text
                  style={[
                    styles.answerText,
                    selectedAnswers.includes(index + 1) &&
                      styles.selectedAnswerText, // Міняємо колір тексту якщо вибрана відповідь
                  ]}>
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{height: 150}}></View>
      </ScrollView>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
  },
  levelText: {
    fontSize: 35,
    marginBottom: 10,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 30,
    marginBottom: 20,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    textAlign: 'center',
  },
  answersContainer: {
    width: '100%',
    alignItems: 'center',
  },
  answerButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    marginBottom: 5,
    backgroundColor: COLORS.primaryTextTransparent,
  },
  selectedAnswerButton: {
    backgroundColor: 'green', // Зелений фон для вибраних відповідей
  },
  answerText: {
    color: COLORS.primary,
    //
    fontSize: 18,
    textAlign: 'center',
  },
  selectedAnswerText: {
    color: 'white', // Білий текст для вибраних відповідей
  },
  scoreText: {
    fontSize: 25,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    marginLeft: 30,
    marginBottom: 10,
  },
});

export default DailyQuizScreen;

import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OperationBtn from './OperationBtn';

const ModalWin = ({modalStatus, supportBtnFoo, winBtnFoo}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalStatus}>
      <View>
        <ScrollView>
          <View style={styles.conteinerModal}>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              Congratulations! You have reached a difficult level!
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              🎉 Well done! 🎉
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              You have successfully completed the first 5 questions and are now
              moving on to the Hard Level of the quiz.
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 20,
                textAlign: 'center',
              }}>
              What to Expect:
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 20,
              }}>
              -The questions will be more challenging.
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 20,
                marginBottom: 15,
              }}>
              -From now on, the coins you earn for each correct answer will be
              doubled.
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              Are you ready for the challenge?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.primary,
                color: COLORS.primaryText,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Click "Start" to continue and test your knowledge on the next
              level!
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: windowWidth * 0.9,
                paddingBottom: 10,
              }}>
              <OperationBtn
                title="Cancel"
                foo={supportBtnFoo}
                castomeStyles={styles.operationBtnStyles}
              />
              <OperationBtn
                title="Start"
                foo={winBtnFoo}
                castomeStyles={styles.operationBtnStyles}
              />
            </View>
          </View>
          <View style={{height: 250}}></View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  conteinerModal: {
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
  img: {width: 250, height: 250, resizeMode: 'cover'},
  operationBtnStyles: {marginTop: 80, width: 120},
});

export default ModalWin;

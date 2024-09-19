import React from 'react';
import {Modal, View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import OperationBtn from './OperationBtn';
import {COLORS} from '../constants/Colors';
import {Dimensions} from 'react-native';
import {FONTS} from '../constants/Fonts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalQuizeScreen = ({
  modalStatus,
  supportBtnFoo,
  localResident,
  question,
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modalStatus}>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>Question from a local resident</Text>
            <Image style={styles.img} source={localResident} />
            <Text style={styles.questionText}>{question}</Text>
            <OperationBtn
              title="Ok"
              foo={supportBtnFoo}
              castomeStyles={styles.operationBtnStyles}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 50,
  },
  text: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 35,
    marginBottom: 20,
    textAlign: 'center',
  },
  img: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    marginBottom: 20,
  },
  questionText: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  operationBtnStyles: {
    width: 100,
  },
});

export default ModalQuizeScreen;

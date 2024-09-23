import React from 'react';
import {Modal, View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import OperationBtn from './OperationBtn';
import {COLORS} from '../constants/Colors';
import {Dimensions} from 'react-native';
import {FONTS} from '../constants/Fonts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalInstruction = ({instructionModalStatus, closeInstructionModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={instructionModalStatus}>
      <View style={styles.instructionModalContainer}>
        <View style={styles.instructionModalContent}>
          <Text style={styles.instructionTitle}>Welcome to the Quiz!</Text>
          <Text style={styles.instructionText}>
            Madrid locals will describe a place to you and the answers will be
            in the form of pictures. Please select the correct image to
            continue.
          </Text>
          <OperationBtn
            title="OK"
            foo={closeInstructionModal}
            castomeStyles={styles.instructionBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  instructionModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383420',
  },
  instructionModalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    alignItems: 'center',
  },
  instructionTitle: {
    fontFamily: FONTS.primary,
    fontSize: 55,
    color: COLORS.primaryText,
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionText: {
    fontFamily: FONTS.primary,
    fontSize: 25,
    color: COLORS.primaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionBtn: {
    width: 100,
  },
});

export default ModalInstruction;

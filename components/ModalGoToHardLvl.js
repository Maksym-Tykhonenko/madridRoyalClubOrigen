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
} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OperationBtn from './OperationBtn';

const ModalGoToHardLvl = ({modalStatus, supportBtnFoo}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalStatus}>
      <View style={styles.conteinerModal}>
        <Image
          style={styles.img}
          source={require('../assets/icons/winner.png')}
        />
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
            marginBottom: 65,
          }}>
          You passed the Daily Quiz and earned extra points!!!
        </Text>

        <OperationBtn
          title="Ok"
          foo={supportBtnFoo}
          castomeStyles={styles.operationBtnStyles}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  conteinerModal: {
    backgroundColor: COLORS.primary,
    flex: 1,
    marginVertical: '30%',
    marginHorizontal: '5%',
    paddingHorizontal: 10,
    paddingTop: 20,
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
  img: {width: 150, height: 150, resizeMode: 'cover'},
  operationBtnStyles: {width: 120},
});

export default ModalGoToHardLvl;

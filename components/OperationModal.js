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

const OperationModal = ({modalStatus, supportBtnFoo}) => {
  const [modalAddFilder, setModalAddFilder] = useState();
  const CloseModal = () => {
    setModalAddFilder(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalStatus}>
      <View style={styles.conteinerModal}>
        <Image
          style={styles.img}
          source={require('../assets/icons/gameOver.png')}
        />

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
  img: {width: 250, height: 250, resizeMode: 'cover'},
  operationBtnStyles: {marginTop: 80, width: 120},
});

export default OperationModal;

import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OperationBtn from './OperationBtn';

const OperationModal = ({close, create}) => {
  const [modalAddFilder, setModalAddFilder] = useState(create);
  const CloseModal = () => {
    setModalAddFilder(false);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modalAddFilder}>
      <View
        style={{
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
        }}>
        {/**Close Btn */}
        <OperationBtn
          title={
            <MaterialCommunityIcons name="close-thick" style={{fontSize: 40}} />
          }
          foo={close}
          castomeStyles={{
            position: 'absolute',
            top: 5,
            right: 5,
            paddingHorizontal: 10,
          }}
        />

        <TextInput
          placeholder="Folder name..."
          placeholderTextColor="rgba(255, 215, 0, 0.5)"
          style={styles.TextInputStyles}
          //onChangeText={setPrevName}
          //value={prevName}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  TextInputStyles: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: windowWidth * 0.6,
    margin: 12,
    padding: 10,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    color: COLORS.primaryText,
    fontSize: 30,
    //fontFamily: 'Starnberg',
  },
});

export default OperationModal;

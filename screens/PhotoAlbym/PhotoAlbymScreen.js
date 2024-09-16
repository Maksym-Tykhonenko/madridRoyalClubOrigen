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
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OperationBtn from '../../components/OperationBtn';
import {uid} from 'uid';

const PhotoAlbymScreen = () => {
  const [folders, setFolders] = useState([]);
  const [modalAddFilder, setModalAddFilder] = useState(false);
  console.log('folders==>', folders);
  const [foldefName, setFoldefName] = useState('');
  console.log('foldefName==>', foldefName);

  useEffect(() => {
    if (folders.length === 0) {
      Alert.alert(`Please click 'Add' for create your first photo folder`);
    }
  }, [folders]);

  const OpenCreateFolderModal = () => {
    setModalAddFilder(true);
  };

  const CloseModalFolderModal = () => {
    setModalAddFilder(false);
    setFoldefName('');
  };

  const CreateNewFoldr = () => {
    let newFolder = {
      id: uid(),
      name: foldefName,
    };

    setFolders([...folders, newFolder]);
    setFoldefName('');
    setModalAddFilder(false);
  };

  return (
    <Layaut>
      <View style={styles.container}>
        <OperationBtn
          title="Add"
          castomeStyles={{position: 'absolute', top: 5, right: 5}}
          foo={OpenCreateFolderModal}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalAddFilder}>
          <View style={styles.modalConteiner}>
            {/**Close Btn */}
            <OperationBtn
              title={
                <MaterialCommunityIcons
                  name="close-thick"
                  style={{fontSize: 40}}
                />
              }
              foo={CloseModalFolderModal}
              castomeStyles={{
                position: 'absolute',
                top: 5,
                right: 5,
                paddingHorizontal: 10,
              }}
            />

            <TextInput
              placeholder="Folder name..."
              placeholderTextColor="rgba(255, 215, 0, 0.3)"
              style={styles.TextInputStyles}
              onChangeText={setFoldefName}
              value={foldefName}
            />

            <OperationBtn
              title="Create"
              castomeStyles={{marginTop: 20}}
              foo={CreateNewFoldr}
            />
          </View>
        </Modal>
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 40,
    alignItems: 'center',
  },
  modalConteiner: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    //justifyContent: 'center',
    flex: 1,
    marginVertical: '50%',
    marginHorizontal: '5%',

    //paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: {width: 30, height: 10},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  TextInputStyles: {
    height: 60,
    width: windowWidth * 0.7,
    marginTop: 100,
    padding: 10,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    color: COLORS.primaryText,
    fontSize: 30,
    fontFamily: FONTS.primary,
  },
});

export default PhotoAlbymScreen;

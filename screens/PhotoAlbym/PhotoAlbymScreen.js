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
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OperationBtn from '../../components/OperationBtn';
import {uid} from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhotoAlbymScreen = ({navigation}) => {
  const [folders, setFolders] = useState([]);
  const [modalAddFilder, setModalAddFilder] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Додаємо стан для відстеження, чи дані завантажені
  const [foldefName, setFoldefName] = useState('');

  console.log('folders==>', folders);
  console.log('length==>', folders.length);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setData();
    }
  }, [folders]);

  const setData = async () => {
    try {
      const data = {
        folders,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setFolders(parsedData.folders);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    } finally {
      setDataLoaded(true); // Вказуємо, що дані завантажено
    }
  };

  useEffect(() => {
    if (dataLoaded && folders.length === 0) {
      Alert.alert(
        'No folders found',
        'Please click "Add" to create your first photo folder',
      );
    }
  }, [folders, dataLoaded]); // Додаємо перевірку на те, чи дані завантажені

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
    console.log('newFolder==>', newFolder);

    if (Array.isArray(folders)) {
      setFolders([newFolder, ...folders]);
    } else {
      setFolders([newFolder]);
    }
    setFoldefName('');
    setModalAddFilder(false);
  };

  return (
    <Layaut>
      <View style={styles.container}>
        <View
          style={{width: windowWidth, alignItems: 'flex-end', marginTop: 5}}>
          <OperationBtn
            title="Add"
            castomeStyles={{width: 110, marginRight: 10}}
            foo={OpenCreateFolderModal}
          />
        </View>

        <ScrollView>
          <View style={styles.containerFolder}>
            {folders &&
              folders.map(folder => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OnePhotoAlbymScreen', {
                        folderName: folder.name,
                      });
                    }}
                    key={folder.id}
                    style={styles.folderItem}>
                    <Image
                      style={styles.folderImg}
                      source={require('../../assets/icons/folder.png')}
                    />
                    <Text style={styles.folderName}>{folder.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{height: 150}}></View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalAddFilder}>
          <View style={styles.modalConteiner}>
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
  },
  modalConteiner: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flex: 1,
    marginVertical: '50%',
    marginHorizontal: '5%',
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
  containerFolder: {
    marginTop: -20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  folderItem: {
    width: 200,
  },
  folderImg: {
    width: 200,
    height: 200,
  },
  folderName: {
    fontFamily: FONTS.primary,
    color: COLORS.primaryText,
    fontSize: 30,
    marginLeft: 40,
    marginTop: -50,
  },
});

export default PhotoAlbymScreen;

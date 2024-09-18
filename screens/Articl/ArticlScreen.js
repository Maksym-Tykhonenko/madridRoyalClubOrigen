import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {articles} from '../../data/articles';
import {FONTS} from '../../constants/Fonts';
import OperationBtn from '../../components/OperationBtn';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uid} from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticlScreen = ({navigation}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [newArticlesArr, setNewArticlesArr] = useState([]);
  console.log('newArticlesArr==>', newArticlesArr);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [newArticlesArr]);

  const setData = async () => {
    try {
      const data = {
        newArticlesArr,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ArticlScreen`, jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ArticlScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setNewArticlesArr(parsedData.newArticlesArr);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const OpenModalAddArticle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const AddPhoto = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setPhoto(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const AddNewArticle = () => {
    let options = {
      name,
      title,
      description,
      latitude,
      longitude,
      image: photo,
    };
    setNewArticlesArr([...newArticlesArr, options]);
    setName('');
    setDescription('');
    setTitle('');
    setLatitude(null);
    setLongitude(null);
    setPhoto(null);

    OpenModalAddArticle();
  };
  return (
    <Layaut>
      <View style={styles.conteiner}>
        <OperationBtn
          title={<Entypo name="plus" style={{fontSize: 40}} />}
          foo={OpenModalAddArticle}
          castomeStyles={styles.OpenModalAddArticleStyles}
        />
        <Text style={styles.headTitle}>Articls:</Text>
        <View style={styles.list}>
          <ScrollView>
            <View>
              {articles.map((art, index) => {
                return (
                  <TouchableOpacity
                    key={art.id}
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate('OneArticlScreen', {item: art});
                    }}>
                    <Text style={styles.itemTitle}>
                      {index + 1}. {art.name}...
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/**new article */}
              {newArticlesArr.map((art, index) => {
                return (
                  <TouchableOpacity
                    key={uid()}
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate('OneArticlScreen', {item: art});
                    }}>
                    <Text style={styles.itemTitle}>
                      {index + 5}. {art.name}...
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalIsOpen}>
          <View style={styles.modalConteiner}>
            <OperationBtn
              title={
                <MaterialCommunityIcons
                  name="close-thick"
                  style={{fontSize: 40}}
                />
              }
              foo={OpenModalAddArticle}
              castomeStyles={{
                position: 'absolute',
                top: 5,
                right: 5,
                paddingHorizontal: 10,
              }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Name..."
                  placeholderTextColor="rgba(255, 215, 0, 0.3)"
                  style={{...styles.TextInputStyles, marginTop: 70}}
                  onChangeText={setName}
                  value={name}
                />
                <TextInput
                  placeholder="Title..."
                  placeholderTextColor="rgba(255, 215, 0, 0.3)"
                  style={styles.TextInputStyles}
                  onChangeText={setTitle}
                  value={title}
                />
                <TextInput
                  placeholder="Discription..."
                  placeholderTextColor="rgba(255, 215, 0, 0.3)"
                  style={styles.TextInputStyles}
                  onChangeText={setDescription}
                  value={description}
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder="Latitude..."
                  placeholderTextColor="rgba(255, 215, 0, 0.3)"
                  style={styles.TextInputStyles}
                  onChangeText={setLatitude}
                  value={latitude}
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder="Longitude..."
                  placeholderTextColor="rgba(255, 215, 0, 0.3)"
                  style={styles.TextInputStyles}
                  onChangeText={setLongitude}
                  value={longitude}
                />

                <OperationBtn
                  title="Add photo"
                  foo={AddPhoto}
                  castomeStyles={{marginTop: 20}}
                />

                <OperationBtn
                  title="Create"
                  castomeStyles={{marginTop: 20}}
                  foo={AddNewArticle}
                />
              </View>
              <View style={{height: 150}}></View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    marginTop: 50,
  },
  OpenModalAddArticleStyles: {
    position: 'absolute',
    right: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: -10,
  },
  headTitle: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 40,
  },
  list: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'flex-start',
  },
  itemTitle: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 40,
  },
  modalConteiner: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flex: 1,
    marginVertical: '20%',
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
    marginTop: 20,
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

export default ArticlScreen;

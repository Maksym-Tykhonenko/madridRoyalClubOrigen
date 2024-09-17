import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ImageBackground,
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
import Entypo from 'react-native-vector-icons/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnePhotoAlbymScreen = ({route, navigation}) => {
  console.log('route==>', route.params);
  const [photos, setPhotos] = useState([]);
  console.log('photos==>', photos);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [photos]);

  const setData = async () => {
    try {
      const data = {
        photos,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(
        `OnePhotoAlbymScreen${route.params.folderName}`,
        jsonData,
      );
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(
        `OnePhotoAlbymScreen${route.params.folderName}`,
      );
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setPhotos(parsedData.photos);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const PhotoPick = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setPhotos([...photos, response.assets[0].uri]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const GoBack = () => {
    navigation.goBack();
  };
  return (
    <Layaut>
      <View style={styles.container}>
        <View style={{marginTop: 50, marginBottom: 10, alignItems: 'center'}}>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.primaryText,
              fontFamily: FONTS.primary,
              fontSize: 40,
            }}>
            {route.params.folderName}
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              //justifyContent: 'center',
            }}>
            {photos &&
              photos.map(item => {
                return (
                  <Image
                    key={uid()}
                    source={{uri: item}}
                    style={{
                      width: windowWidth * 0.45,
                      height: windowWidth * 0.45,
                      margin: windowWidth * 0.025,
                    }}
                  />
                );
              })}
          </View>
          <View style={{height: 200}}></View>
        </ScrollView>

        <OperationBtn
          title={<Entypo name="plus" style={{fontSize: 40}} />}
          castomeStyles={{
            position: 'absolute',
            top: 5,
            right: 5,
            paddingHorizontal: 7,
          }}
          foo={PhotoPick}
        />

        <OperationBtn
          title="Back"
          castomeStyles={{position: 'absolute', bottom: 5, right: 5}}
          foo={GoBack}
        />
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
});

export default OnePhotoAlbymScreen;

import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
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
import Map from '../../components/Map';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uid} from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OneArticlScreen = ({navigation, route}) => {
  console.log('route==>', route);
  const {name, title, content, image, latitude, longitude} = route.params.item;
  //console.log(latitude, longitude);
  const [isExpanded, setIsExpanded] = useState(true); // Стан для контролю розгорнутого/скороченого тексту
  const [photosFromThisPlase, setPhotosFromThisPlase] = useState([]);
  //console.log('photosFromThisPlase==>', photosFromThisPlase);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [photosFromThisPlase]);

  const setData = async () => {
    try {
      const data = {
        photosFromThisPlase,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`OneArticlScreen${name}`, jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`OneArticlScreen${name}`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setPhotosFromThisPlase(parsedData.photosFromThisPlase);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const GoBack = () => {
    navigation.goBack();
  };

  const getShortContent = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
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
        setPhotosFromThisPlase([
          ...photosFromThisPlase,
          response.assets[0].uri,
        ]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  return (
    <Layaut>
      <View style={styles.conteiner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{}}>
            <Text style={styles.artName}>{name}!!!</Text>
            {image && image.length > 3 ? (
              <View style={styles.artImgCont}>
                <Image style={styles.artImage} source={{uri: image}} />
              </View>
            ) : (
              <View style={styles.artImgCont}>
                <Image style={styles.artImage} source={image} />
              </View>
            )}

            <Text style={styles.artTitle}>{title}</Text>

            {/* Контент, що може бути скороченим або повним */}
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.artContent}>
                {isExpanded ? content : getShortContent(content, 35)}
              </Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <Map latitude={latitude} longitude={longitude} />
            </View>
          </View>

          <View style={styles.AddPhotoCont}>
            <OperationBtn
              foo={AddPhoto}
              title="Add photo"
              castomeStyles={styles.AddPhotoBtn}
            />
          </View>

          <View style={styles.imgCont}>
            {photosFromThisPlase &&
              photosFromThisPlase.map(photo => {
                return (
                  <Image
                    key={uid()}
                    style={styles.imeges}
                    source={{uri: photo}}
                  />
                );
              })}
          </View>

          <View style={{height: 150}}></View>
        </ScrollView>

        <OperationBtn
          foo={GoBack}
          title="Back"
          castomeStyles={styles.goBackBtnStyles}
        />
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
  goBackBtnStyles: {position: 'absolute', bottom: 5, right: 5},
  artName: {
    marginBottom: 10,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 35,
    textAlign: 'center',
  },
  artImgCont: {width: windowWidth, alignItems: 'center'},
  artImage: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
  },
  artTitle: {
    marginBottom: 10,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 25,
    textAlign: 'center',
  },
  artContent: {
    marginBottom: 10,
    color: COLORS.primaryText,
    //fontFamily: FONTS.primary,
    fontSize: 18,
    //textAlign: 'center',
    paddingHorizontal: 10,
  },
  mapContainer: {
    marginBottom: 10,
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
  },
  AddPhotoCont: {width: windowWidth, alignItems: 'center'},
  AddPhotoBtn: {marginBottom: 10, width: 200},
  imgCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: windowWidth,
  },
  imeges: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    marginLeft: 20,
    marginBottom: 15,
  },
});

export default OneArticlScreen;

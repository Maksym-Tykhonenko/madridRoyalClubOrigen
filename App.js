import React, {useRef, useEffect, useState} from 'react';
import {Text, StyleSheet, Animated, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import MainMenyRoute from './routes/MainMenyRoute';
import ToursToMadridRoute from './routes/ToursToMadridRoute';
import PhotoAlbymRoute from './routes/PhotoAlbymRoute';
import ArticlRoute from './routes/ArticlRoute';
import SetingsRoute from './routes/SetingsRoute';
import MadridRoyalClubProdactScreen from './screens/MadridRoyalClubProdactScreen';

import Layaut from './components/Layaut';
import {COLORS} from './constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS} from './constants/Fonts';
//import * as Progress from 'react-native-progress';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';
import AppleAdsAttribution from '@hexigames/react-native-apple-ads-attribution';

const App = () => {
  const [route, setRoute] = useState(true);
  //console.log('route==>', route)
  const [idfa, setIdfa] = useState();
  console.log('idfa==>', idfa);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();
  console.log('appsUid==>', appsUid);
  console.log('sab1==>', sab1);
  console.log('pid==>', pid);
  const [adServicesToken, setAdServicesToken] = useState(null);
  //console.log('adServicesToken', adServicesToken);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    idfa,
    appsUid,
    sab1,
    pid,
    adServicesToken,
    adServicesAtribution,
    adServicesKeywordId,
  ]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        appsUid,
        sab1,
        pid,
        adServicesToken,
        adServicesAtribution,
        adServicesKeywordId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
        setAdServicesToken(parsedData.adServicesToken);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setAdServicesKeywordId(parsedData.adServicesKeywordId);
      } else {
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();
        await fetchAdServicesToken(); // Вставка функції для отримання токену
        await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ///////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };

  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? '1' : '0';
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error('Помилка при отриманні даних AdServices:', error.message);
    }
  };

  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'SaD7GwYCXEMiVeyH3UnWZ4',
            appId: '6702020932',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject,
        );
      });
      console.log('App.js AppsFlyer ініціалізовано успішно');
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          console.log('This is not first launch');
        }
      } catch (error) {
        console.log('Error processing install conversion data:', error);
      }
    },
  );

  ///////// OneSignall
  // d4841ab0-6d3e-488c-aad1-6ce990628309
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      //console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('d4841ab0-6d3e-488c-aad1-6ce990628309');

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  // wonderful-majestic-ecstasy.space
  useEffect(() => {
    const checkUrl = `https://wonderful-majestic-ecstasy.space/26rNPDf6`;

    const targetData = new Date('2024-09-29T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              idfa: idfa,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
              adToken: adServicesToken,
              adAtribution: adServicesAtribution,
              adKeywordId: adServicesKeywordId,
            }}
            name="MadridRoyalClubProdactScreen"
            component={MadridRoyalClubProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#000',
          tabBarInactiveBackgroundColor: '#000',
        }}>
        <Tab.Screen
          name="MainMenyRoute"
          component={MainMenyRoute}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Entypo
                  name="home"
                  style={{
                    fontSize: 30,
                    color: focused ? '#FFD700' : '#fff',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ToursToMadridRoute"
          component={ToursToMadridRoute}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="map-marked-alt"
                  style={{
                    fontSize: 30,
                    color: focused ? '#FFD700' : '#fff',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="PhotoAlbymRoute"
          component={PhotoAlbymRoute}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome
                  name="photo"
                  style={{
                    fontSize: 30,
                    color: focused ? '#FFD700' : '#fff',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ArticlRoute"
          component={ArticlRoute}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <MaterialIcons
                  name="article"
                  style={{
                    fontSize: 30,
                    color: focused ? '#FFD700' : '#fff',
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="SetingsRoute"
          component={SetingsRoute}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Ionicons
                  name="settings"
                  style={{
                    fontSize: 30,
                    color: focused ? '#FFD700' : '#fff',
                  }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: 'rgba(0,0,0)',
          }}>
          <Animated.Image
            source={require('./assets/newDiz/Loader1.png')}
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
          <Animated.Image
            source={require('./assets/newDiz/Loader2.png')}
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
        </View>
      ) : (
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imgBack: {flex: 1},
  contentConteiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  congratText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default App;
{
  /** const [louderIsEnded, setLouderIsEnded] = useState(false);
  const [prog, setProg] = React.useState(0);
  const [indeterminate, setIndeterminate] = React.useState(true);

  const appearingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    let interval;
    const timer = setTimeout(() => {
      setIndeterminate(false);
      // Увеличиваем прогресс на равные части в зависимости от времени
      interval = setInterval(() => {
        setProg(prevProg => Math.min(1, prevProg + 1 / (5500 / 500))); // 7 секунд
      }, 500); // Інтервал у мілісекундах (0.5 секунди)
    }, 1500); // Початковий таймер для індетермінованого стану
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);*/
}

{
  /**
    <Layaut>
          <View style={{flex: 1, alignItems: 'center', paddingBottom: 30}}>
            <Animated.View
              style={{...styles.contentConteiner, opacity: appearingAnim}}>
              <Text style={{...styles.congratText}}>Madrid Royal Club!</Text>

              <Progress.Bar
                width={200}
                color="#FFD700"
                progress={prog}
                indeterminate={indeterminate}
              />
            </Animated.View>
          </View>
        </Layaut>
    */
}

import React, {useRef, useEffect, useState} from 'react';
import {Text, StyleSheet, Animated, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import MainMenyRoute from './routes/MainMenyRoute';
import ToursToMadridRoute from './routes/ToursToMadridRoute';
import PhotoAlbymRoute from './routes/PhotoAlbymRoute';
import ArticlRoute from './routes/ArticlRoute';
import SetingsRoute from './routes/SetingsRoute';

import Layaut from './components/Layaut';
import {COLORS} from './constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS} from './constants/Fonts';
import * as Progress from 'react-native-progress';

const App = () => {
  /////////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
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
  }, []);

  return (
    <NavigationContainer>
      {!louderIsEnded ? (
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
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: COLORS.primary,
            tabBarInactiveBackgroundColor: COLORS.primary,
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

import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeMainMenyScreen = ({navigation}) => {
  return (
    <Layaut>
      <View style={styles.container}>
        {/**Profile Btn */}
        <TouchableOpacity
          style={styles.buttonProfile}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <MaterialCommunityIcons
            name="face-man"
            style={{color: COLORS.primaryText, fontSize: 50}}
          />
        </TouchableOpacity>

        {/**Daily Quiz */}
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            navigation.navigate('DailyQuizScreen');
          }}>
          <Text style={styles.btnsText}>Daily Quiz</Text>
        </TouchableOpacity>

        {/**A Quiz */}
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            navigation.navigate('QuizeScreen');
          }}>
          <Text style={styles.btnsText}>A Quiz</Text>
        </TouchableOpacity>

        {/**Leader board */}
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            navigation.navigate('LeaderBoardScreen');
          }}>
          <Text style={styles.btnsText}>Leader board</Text>
        </TouchableOpacity>

        {/**About us */}
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            navigation.navigate('AboutUsScreen');
          }}>
          <Text style={styles.btnsText}>About us</Text>
        </TouchableOpacity>
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonProfile: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  btns: {
    width: windowWidth * 0.7,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.primaryText,
    backgroundColor: 'rgba(255, 215, 0, 0.8)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnsText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONTS.primary,
  },
});

export default HomeMainMenyScreen;

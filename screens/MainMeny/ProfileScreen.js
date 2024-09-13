import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BtnBack from '../../components/BtnBack';
import Foundation from 'react-native-vector-icons/Foundation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = ({navigation}) => {
  const [selectAvatar, setSelectAvatar] = useState(null);

  const SelectAvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };
  return (
    <Layaut>
      <View style={styles.conteiner}>
        <Text style={styles.subtitle}>Avatar</Text>
        <TouchableOpacity
          onPress={() => {
            SelectAvatarPicer();
          }}>
          {selectAvatar ? (
            <View style={{marginTop: 20}}>
              <Image source={{uri: selectAvatar}} style={styles.avatar} />
            </View>
          ) : (
            <Foundation
              name="social-picasa"
              style={{
                fontSize: 250,
                color: '#FFD700',
              }}
            />
          )}
        </TouchableOpacity>

        <BtnBack navigation={navigation} />
      </View>
    </Layaut>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    position: 'relative',
  },
  subtitle: {
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontSize: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderColor: COLORS.primaryText,
    borderWidth: 3,
  },
});

export default ProfileScreen;

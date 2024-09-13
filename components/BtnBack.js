import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';

const BtnBack = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.btn}>
      <Text style={styles.btnText}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 3,
    borderColor: COLORS.primaryText,
    height: 60,
    width: 120,
    borderRadius: 50,
    backgroundColor: COLORS.primaryTextTransparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {color: COLORS.primary, fontFamily: FONTS.primary, fontSize: 27},
});

export default BtnBack;

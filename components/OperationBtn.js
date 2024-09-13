import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';

const OperationBtn = ({foo, title, castomeStyles}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        foo();
      }}
      style={[styles.btnReset, castomeStyles]}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnReset: {
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

export default OperationBtn;

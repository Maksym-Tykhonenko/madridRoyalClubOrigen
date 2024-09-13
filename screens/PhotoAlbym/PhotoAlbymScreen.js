import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Entypo from 'react-native-vector-icons/Entypo';
import OperationBtn from '../../components/OperationBtn';

const PhotoAlbymScreen = () => {
  const [folders, setFolders] = useState([]);
  console.log('folders==>', folders);

  useEffect(() => {
    if (folders.length === 0) {
      Alert.alert(`Please click 'Create' for create your first photo folder`);
    }
  }, [folders]);

  const HandleCreateFolder = () => {
    setFolders(prev => prev + 1);
  };
  return (
    <Layaut>
      <View
        style={{
          flex: 1,
          position: 'relative',
          marginTop: 40,
          alignItems: 'center',
        }}>
        <OperationBtn
          title="Create"
          castomeStyles={{position: 'absolute', top: 5, right: 5}}
          foo={HandleCreateFolder}
        />
      </View>
    </Layaut>
  );
};

export default PhotoAlbymScreen;

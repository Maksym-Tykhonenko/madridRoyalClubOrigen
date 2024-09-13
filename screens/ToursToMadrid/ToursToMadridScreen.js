import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Layaut from '../../components/Layaut';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Entypo from 'react-native-vector-icons/Entypo';
import OperationBtn from '../../components/OperationBtn';

const ToursToMadridScreen = () => {
  const [region, setRegion] = useState({
    latitude: 40.43261048474823,
    longitude: -3.6932816022259702,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };
  return (
    <Layaut>
      <View style={{flex: 1}}>
        <View style={{marginTop: 30, marginHorizontal: 20, marginBottom: 10}}>
          <Text style={styles.title}>Map:</Text>
          <MapView
            style={styles.rootContainer}
            region={region}
            //</View>onRegionChangeComplete={region => setRegion(region)}
          >
            <Marker
              coordinate={{
                latitude: 40.43261048474823,
                longitude: -3.6932816022259702,
              }}
            />
          </MapView>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <OperationBtn
          title={<Entypo name="minus" style={{fontSize: 40}} />}
          castomeStyles={{position: 'absolute', bottom: 5, left: 5}}
          foo={zoomOut}
        />
        <OperationBtn
          title={<Entypo name="plus" style={{fontSize: 40}} />}
          castomeStyles={{position: 'absolute', bottom: 5, right: 5}}
          foo={zoomIn}
        />
      </View>
    </Layaut>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    height: 1,
    height: windowHeight * 0.7,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 40,
    color: COLORS.primaryText,
    fontFamily: FONTS.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ToursToMadridScreen;

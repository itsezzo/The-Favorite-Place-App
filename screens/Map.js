import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import HeaderButton from '../components/ui/HeaderButton';

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleSelectingLocation(event) {
    // console.log(event);
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lan: event.nativeEvent.coordinate.longitude,
    });
  }

  const handleSaveLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'Nol Location Picked!',
        'Please pick a location (click on the map) first'
      );
      return;
    }
    navigation.navigate('addPlace', {
      pickedLat: selectedLocation.lat,
      pickedLan: selectedLocation.lan,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <HeaderButton
          icon='save'
          color={tintColor}
          size={24}
          onPress={handleSaveLocation}
        />
      ),
    });
  }, [navigation, handleSaveLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectingLocation}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lan,
          }}
        />
      )}
    </MapView>
    // <View style={styles.container}>
    // </View>
  );
}

const styles = StyleSheet.create({
  //   container: {
  // },
  map: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    // color: '#af03af'
  },
});

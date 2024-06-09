import { View, StyleSheet, Text, Image } from 'react-native';

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import IconBtn from '../ui/IconBtn';

import { colors } from '../../constants/colors';
import { useEffect, useState } from 'react';
import { getAddress, getPosition } from '../../utils/location';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export default function LocationPicker({onSelect}) {
  const [pickedPosission, setPickedPosition] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lan: route.params.pickedLan,
      };
      setPickedPosition(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function pickingPosition() {
      if(pickedPosission) {
        const address = await getAddress(pickedPosission.lat, pickedPosission.lan)
        onSelect({...pickedPosission, address: address})
      }
    }
    pickingPosition();
  }, [pickedPosission, onSelect])

  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const locationResponse = await requestPermission();
      return locationResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this App'
      );
      return false;
    }
    return true;
  }

  async function handleGettingLocation() {
    const haspermission = await verifyPermission();
    if (!haspermission) {
      return;
    }
    const position = await getCurrentPositionAsync();
    // console.log(position);
    setPickedPosition({
      lat: position.coords.latitude,
      lan: position.coords.longitude,
    });
  }

  function handlePickingLocation() {
    navigation.navigate('Map');
  }

  let positionPreview = <Text>No position picked yet!</Text>;

  if (pickedPosission) {
    positionPreview = (
      <Image
        style={styles.image}
        source={{ uri: getPosition(pickedPosission.lat, pickedPosission.lan) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{positionPreview}</View>
      <View style={styles.actions}>
        <IconBtn icon='location' onPress={handleGettingLocation}>
          Pick User
        </IconBtn>
        <IconBtn icon='map' onPress={handlePickingLocation}>
          Pick on Map
        </IconBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    backgroundColor: colors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

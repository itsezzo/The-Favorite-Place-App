import { useState } from 'react';
import { View, Button, Alert, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import IconBtn from '../ui/IconBtn';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

export default function ImagePIcker({onPick}) {
  const [pickedImage, setPickedImage] = useState();
  
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  
  async function verifyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this App'
      );
      // cameraPermissionInfo.status = PermissionStatus.GRANTED
      return false;
    }
    return true;
  }

  async function handleTakingImage() {
    const haspermission = await verifyPermission();

    if (!haspermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image.assets[0].uri);
    setPickedImage(image.assets[0].uri);
    onPick(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <IconBtn icon='camera' onPress={handleTakingImage}>
        Take Image
      </IconBtn>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    backgroundColor: colors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

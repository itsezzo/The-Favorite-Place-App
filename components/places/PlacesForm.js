import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';

import { colors } from '../../constants/colors';
import { useCallback, useState } from 'react';
import ImagePIcker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Submit from '../ui/Submit';
import { Place } from '../../model/place';

export default function PlacesForm({onPlaceCreation}) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedImage, setPickedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function handleChangeTitle(enteredText) {
    setEnteredTitle(enteredText)
  }

  function handlePickImage(imageUri) {
    setPickedImage(imageUri);
  }

  const handleSelectLocation = useCallback((location) => {
    setSelectedLocation(location);
  }, [])

  function handleSavePlace() {
    const place = new Place(enteredTitle, pickedImage, selectedLocation);
    onPlaceCreation(place);
  }

  

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={handleChangeTitle} value={enteredTitle} />
      </View>
      <ImagePIcker onPick={handlePickImage} />
      <LocationPicker onSelect={handleSelectLocation} />
      <Submit onPress={handleSavePlace}>Add Place</Submit>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 24,
  },
  label: {
    color: colors.primary500,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.primary100,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: colors.primary700,
    borderBottomWidth: 2
  },
});

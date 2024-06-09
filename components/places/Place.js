import { Image, Pressable, StyleSheet, View, Text } from 'react-native';

import { colors } from '../../constants/colors';

export default function Place({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: place.imageUrl }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 4,
    overflow: 'hidden'
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.gray700
  },
  address: {
    fontSize: 12,
    color: colors.gray700
  },
});

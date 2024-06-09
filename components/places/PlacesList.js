import { FlatList, StyleSheet, Text, View } from 'react-native';
import Place from './Place';
import { colors } from '../../constants/colors';

export default function PlacesList({ items }) {
  if (!items || items.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added yet! - Start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Place place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: colors.primary200,
  },
});

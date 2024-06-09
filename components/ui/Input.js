import { Text, View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default function Input({ label }) {
  
  function handleInput(enterdText) {
    console.log(enterdText);
  }
    return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} onChangeText={handleInput} />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {},
    label: {
        color: colors.primary200,
        marginVertical: 8,
        // fontSize: 14,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: colors.primary100,
        height: 40,
    }
})
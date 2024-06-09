import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default function Submit({children, onPress}) {
    return(
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        backgroundColor: colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 2,
        borderRadius: 4
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: "center",
        color: colors.primary50,
        fontSize: 16
    }
})
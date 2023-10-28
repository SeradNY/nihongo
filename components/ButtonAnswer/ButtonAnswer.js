import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function ButtonAnswer({ label, check }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => check(label)}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 3,
        border: '1px solid #353a41',
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});

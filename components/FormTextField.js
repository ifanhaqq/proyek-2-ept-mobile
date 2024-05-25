import { Text, View, TextInput, StyleSheet } from 'react-native'

export default function FormTextField({ label, errors = [], ...rest }) {
    return (
        <View>
            {label && (
                <Text style={styles.textStyle}>{label}</Text>
            )}
            <TextInput style={styles.formStyle} {...rest} />
            {errors.map((err) => {
                return <Text key={err} style={styles.error}>{err}</Text>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    SAVStyle: {
        backgroundColor: "#fff",
        flex: 1
    },
    viewStyle: {
        padding: 20,
    },
    textStyle: {
        color: '#334155',
        fontWeight: '500',
    },
    formStyle: {
        backgroundColor: '#f1f5f9',
        height: 40,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#cbd5e1',
        padding: 10,
    },
    error: {
        color: "red",
        marginTop: 2
    }
});
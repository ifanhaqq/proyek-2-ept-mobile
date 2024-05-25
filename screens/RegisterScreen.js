import { useState, useContext } from 'react'
import { SafeAreaView, View, StyleSheet, Button, Platform } from 'react-native'
import FormTextField from '../components/FormTextField'
import { register } from '../services/AuthServices'
import AuthContext from '../contexts/AuthContext'



export default function ({ navigation }) {
    const { setUser } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [nim, setNim] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    async function handleRegister() {
        // console.log(name, nim, email, password, passwordConfirmation)
        setErrors({})
        try {
            await register({
                name,
                nim,
                email,
                password,
                password_confirmation: passwordConfirmation,
                device_name: `${Platform.OS} ${Platform.Version}`
            })

            navigation.replace("Login")
        } catch (e) {
            console.log(e)
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <FormTextField label="Your name:"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    errors={errors.name} />
                <FormTextField label="Your NIM:"
                    value={nim}
                    onChangeText={(text) => setNim(text)}
                    errors={errors.nim} />
                <FormTextField label="Email address:"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    errors={errors.email} />
                <FormTextField label="Password:"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    errors={errors.password} />
                <FormTextField label="Confirm your password:"
                    value={passwordConfirmation}
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordConfirmation(text)}
                    errors={errors.password_confirmation} />
                <Button title='Sign up' onPress={handleRegister} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: "#fff", flex: 1 },
    container: { padding: 20, rowGap: 16, }
})


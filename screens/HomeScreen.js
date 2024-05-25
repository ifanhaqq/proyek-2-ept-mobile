import { SafeAreaView, Text, Button } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { logout } from '../services/AuthServices'

export default function () {
    const { user, setUser } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
        setUser(null)
    }

    return (
        <SafeAreaView>
            <Text>Welcome, {user.name}</Text>
            <Button title='Logout' onPress={handleLogout} />
        </SafeAreaView>
    )
}
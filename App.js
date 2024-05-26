import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContext from "./contexts/AuthContext";
import { loadUser } from "./services/AuthServices";
import { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}


export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser()
        setUser(user)
      } catch (e) {
        console.log("Failed to load user", e)
      }

      setStatus("idle")
    }

    runEffect()
  }, [])

  if (status === "loading") {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Logged" 
                            component={LoggedTab}
                            options={{ headerShown: false}}
                            />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Create an account" component={RegisterScreen} />
            </>
          )}


        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

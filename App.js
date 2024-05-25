import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContext from "./contexts/AuthContext";
import { loadUser } from "./services/AuthServices";
import { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();


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
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          )}


        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

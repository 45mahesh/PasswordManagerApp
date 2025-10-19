import React from "react";
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme, View, Text, StyleSheet } from "react-native";

import MasterPasswordScreen from "./screens/MasterPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import AddPasswordScreen from "./screens/AddPasswordScreen";
import ViewPasswordScreen from "./screens/ViewPasswordScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  // merge paper + navigation themes
  const paperTheme = scheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const navTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Master" component={MasterPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddPasswordScreen} />
          <Stack.Screen name="View" component={ViewPasswordScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function SplashScreen({ navigation }) {
  const scheme = useColorScheme();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Master");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={[
        styles.splash,
        { backgroundColor: scheme === "dark" ? "#000000" : "#ffffff" }
      ]}
    >
      <Text
        style={[
          styles.splashText,
          { color: scheme === "dark" ? "#ffffff" : "#000000" }
        ]}
      >
        SecureVault 🔐
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  splashText: {
    fontSize: 28,
    fontWeight: "bold"
  }
});

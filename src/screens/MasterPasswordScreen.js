import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Title, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MasterPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [storedUser, setStoredUser] = useState(null);
  const [storedPassword, setStoredPassword] = useState(null);
  const [isSetting, setIsSetting] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const load = async () => {
      const savedUser = await AsyncStorage.getItem("username");
      const savedPass = await AsyncStorage.getItem("masterPassword");
      if (savedUser && savedPass) {
        setStoredUser(savedUser);
        setStoredPassword(savedPass);
        setIsSetting(false);
      } else {
        setIsSetting(true);
      }
    };
    load();
  }, []);

  const handleSet = async () => {
    if (!username || masterPassword.length < 4) {
      Alert.alert("Error", "Enter valid username and password (min 4 chars).");
      return;
    }
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("masterPassword", masterPassword);
    Alert.alert("Success", "Account created!");
    navigation.replace("Home");
  };

  const handleLogin = () => {
    if (username === storedUser && masterPassword === storedPassword) {
      navigation.replace("Home");
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={{ color: colors.onBackground, textAlign: "center", marginBottom: 20 }}>
        {isSetting ? "Create Account" : "Login"}
      </Title>

      <TextInput
        label="Username / Email"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 15 }}
      />
      <TextInput
        label="Master Password"
        secureTextEntry
        mode="outlined"
        value={masterPassword}
        onChangeText={setMasterPassword}
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={isSetting ? handleSet : handleLogin}>
        {isSetting ? "Set Credentials" : "Login"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
});

export default MasterPasswordScreen;

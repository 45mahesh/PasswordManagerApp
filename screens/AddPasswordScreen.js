import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { savePassword } from "../storage/storage";
import { encrypt } from "../utils/crypto";

function AddPasswordScreen({ navigation }) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const { colors } = useTheme();

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(pass);
  };

  const handleSave = async () => {
    if (!site || !username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const encrypted = encrypt(password);
    const data = JSON.stringify({ username, password: encrypted });
    const success = await savePassword(site, data);

    if (success) {
      Alert.alert("Success", "Password saved!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Could not save password.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput label="Site" mode="outlined" value={site} onChangeText={setSite} style={styles.input} />
      <TextInput label="Username" mode="outlined" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} />}
        style={styles.input}
      />

      <Button mode="contained" onPress={generatePassword} style={{ marginBottom: 10 }}>
        Generate Password
      </Button>
      <Button mode="contained" onPress={handleSave}>
        Save Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10 },
});

export default AddPasswordScreen;

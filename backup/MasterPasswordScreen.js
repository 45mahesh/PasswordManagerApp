import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MasterPasswordScreen({ navigation }) {
  const [masterPassword, setMasterPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState(null);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    // Check if master password exists
    AsyncStorage.getItem('masterPassword').then((pwd) => {
      if (pwd) setStoredPassword(pwd);
      else setIsSetting(true);
    });
  }, []);

  const handleSetMasterPassword = async () => {
    if (masterPassword.length < 4) {
      Alert.alert('Error', 'Master password must be at least 4 characters.');
      return;
    }
    await AsyncStorage.setItem('masterPassword', masterPassword);
    Alert.alert('Success', 'Master password set!');
    navigation.replace('Add'); // Go to main screen
  };

  const handleCheckMasterPassword = () => {
    if (masterPassword === storedPassword) {
      navigation.replace('Add');
    } else {
      Alert.alert('Error', 'Incorrect master password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isSetting ? 'Set Master Password' : 'Enter Master Password'}
      </Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={masterPassword}
        onChangeText={setMasterPassword}
        placeholder="Master password"
      />
      <Button
        title={isSetting ? 'Set Password' : 'Unlock'}
        onPress={isSetting ? handleSetMasterPassword : handleCheckMasterPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

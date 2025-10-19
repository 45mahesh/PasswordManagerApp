import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { encrypt } from '../utils/crypto';
import { savePassword } from '../storage/storage';

export default function AddPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    const encrypted = encrypt(password);
    await savePassword('myPassword', encrypted);
    alert('Password saved!');
    setPassword('');
    navigation.navigate('View');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
      />
      <Button title="Save Password" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { marginBottom: 10, fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

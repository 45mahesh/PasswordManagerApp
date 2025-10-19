import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getPassword } from '../storage/storage';
import { decrypt } from '../utils/crypto';

export default function ViewPasswordScreen() {
  const [password, setPassword] = useState('Loading...');

  const loadPassword = async () => {
    const encrypted = await getPassword('myPassword');
    if (encrypted) {
      setPassword(decrypt(encrypted));
    } else {
      setPassword('No password found');
    }
  };

  useEffect(() => {
    loadPassword();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saved Password:</Text>
      <Text style={styles.password}>{password}</Text>
      <Button title="Refresh" onPress={loadPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  password: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

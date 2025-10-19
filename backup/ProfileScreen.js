import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Title, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const logout = async () => {
    await AsyncStorage.removeItem("masterPassword");
    Alert.alert("Logged out", "You will need to set a new master password.");
    navigation.replace("Master");
  };

  return (
    <View style={styles.container}>
      <Title style={{ marginBottom: 20 }}>Profile & Settings</Title>
      <List.Item title="Switch Account" left={(props) => <List.Icon {...props} icon="account" />} />
      <List.Item title="Security" left={(props) => <List.Icon {...props} icon="shield-lock" />} />
      <List.Item title="Backup" left={(props) => <List.Icon {...props} icon="backup-restore" />} />
      
      <Button mode="contained" onPress={logout} style={{ marginTop: 20 }}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

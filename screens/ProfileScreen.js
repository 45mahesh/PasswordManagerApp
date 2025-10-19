import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Title, List, useTheme, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("username");
      if (savedUser) setUsername(savedUser);
    };
    loadUser();
  }, []);

  const switchAccount = async () => {
    Alert.alert("Switch Account", "Do you want to switch account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("masterPassword");
          navigation.replace("Master");
        },
      },
    ]);
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("Master"),
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={{ color: colors.onBackground, marginBottom: 10 }}>Profile & Settings</Title>
      <Text style={{ color: colors.onBackground, marginBottom: 20 }}>Logged in as: {username || "Unknown"}</Text>

      <List.Item
        title="Switch Account"
        left={(props) => <List.Icon {...props} icon="account-switch" />}
        onPress={switchAccount}
      />
      <List.Item title="Security" left={(props) => <List.Icon {...props} icon="shield-lock" />} />

      <Button mode="contained" onPress={logout} style={{ marginTop: 20 }}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default ProfileScreen;

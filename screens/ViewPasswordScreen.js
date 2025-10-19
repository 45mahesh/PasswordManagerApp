import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph, IconButton, Button, useTheme } from "react-native-paper";
import { decrypt } from "../utils/crypto";
import { deletePassword } from "../storage/storage";

function ViewPasswordScreen({ route, navigation }) {
  const { data } = route.params;
  const [secure, setSecure] = useState(true);
  const { colors } = useTheme();

  const decryptedPassword = decrypt(data.password);

  const handleDelete = () => {
    Alert.alert("Delete Password", `Delete saved password for ${data.site}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deletePassword(data.site);
          Alert.alert("Deleted", "Password entry removed.");
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card>
        <Card.Content>
          <Title>{data.site}</Title>
          <Paragraph>Username: {data.username}</Paragraph>
          <Paragraph>Password: {secure ? "••••••" : decryptedPassword}</Paragraph>
          <Paragraph style={{ fontSize: 12, color: "gray" }}>
            Last Updated: {new Date(data.timestamp).toLocaleString()}
          </Paragraph>
          <IconButton icon={secure ? "eye-off" : "eye"} onPress={() => setSecure(!secure)} />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleDelete} style={{ marginTop: 20, backgroundColor: "red" }}>
        Delete Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default ViewPasswordScreen;

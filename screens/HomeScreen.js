import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, FAB, Appbar, TextInput, useTheme } from "react-native-paper";
import { getAllPasswords } from "../storage/storage";

function HomeScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");
  const { colors } = useTheme();

  const loadPasswords = async () => {
    const result = await getAllPasswords();
    setPasswords(
      result.map((item, index) => {
        const parsed = JSON.parse(item.value);
        return {
          id: `${item.site}_${index}`,
          site: item.site,
          username: parsed.username,
          password: parsed.password,
          timestamp: parsed.timestamp,
        };
      })
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPasswords);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (search && !item.site.toLowerCase().includes(search.toLowerCase())) return null;
    return (
      <Card style={{ marginVertical: 5 }} onPress={() => navigation.navigate("View", { data: item })}>
        <Card.Content>
          <Title>{item.site}</Title>
          <Paragraph>Username: {item.username}</Paragraph>
          <Paragraph style={{ fontSize: 12, color: "gray" }}>
            Last Updated: {new Date(item.timestamp).toLocaleString()}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="SecureVault 🔐" />
        <Appbar.Action icon="account" onPress={() => navigation.navigate("Profile")} />
      </Appbar.Header>

      <TextInput mode="outlined" placeholder="Search..." value={search} onChangeText={setSearch} style={{ margin: 10 }} />

      <FlatList data={passwords} keyExtractor={(item) => item.id} renderItem={renderItem} />

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate("Add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: "absolute", right: 16, bottom: 16 },
});

export default HomeScreen;

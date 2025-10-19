import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, FAB, Appbar, TextInput } from "react-native-paper";
import { getPassword } from "../storage/storage";

export default function HomeScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");

  const loadPasswords = async () => {
    let keys = await SecureStore.getAllKeysAsync();
    let result = [];
    for (let key of keys) {
      let data = await getPassword(key);
      if (data) {
        let parsed = JSON.parse(data);
        result.push({ id: key, site: key, username: parsed.username, password: parsed.password });
      }
    }
    setPasswords(result);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPasswords);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (search && !item.site.toLowerCase().includes(search.toLowerCase())) return null;
    return (
      <Card
        style={{ marginVertical: 5 }}
        onPress={() => navigation.navigate("View", { data: item })}
      >
        <Card.Content>
          <Title>{item.site}</Title>
          <Paragraph>{item.username}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="SecureVault 🔐" />
        <Appbar.Action icon="account" onPress={() => navigation.navigate("Profile")} />
      </Appbar.Header>

      <TextInput
        mode="outlined"
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={{ margin: 10 }}
      />

      <FlatList data={passwords} keyExtractor={(item) => item.id} renderItem={renderItem} />

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate("Add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: "absolute", right: 16, bottom: 16 },
});

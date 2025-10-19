import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// helper: make valid key for SecureStore
function makeKey(user, site) {
  return `${user}_${site.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
}

// helper: get current user
async function getCurrentUser() {
  try {
    const user = await AsyncStorage.getItem("username");
    return user;
  } catch (error) {
    console.error("❌ Error getting current user:", error);
    return null;
  }
}

// save password
export async function savePassword(site, value) {
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const parsed = JSON.parse(value);
    parsed.timestamp = new Date().toISOString(); // add timestamp
    const finalValue = JSON.stringify(parsed);

    const key = makeKey(user, site);
    await SecureStore.setItemAsync(key, finalValue);

    // maintain site list in AsyncStorage
    const listKey = `${user}:sites`;
    let sites = JSON.parse((await AsyncStorage.getItem(listKey)) || "[]");
    if (!sites.includes(site)) {
      sites.push(site);
      await AsyncStorage.setItem(listKey, JSON.stringify(sites));
    }

    return true;
  } catch (error) {
    console.error("❌ Error saving password:", error);
    return false;
  }
}

// get password
export async function getPassword(site) {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    const key = makeKey(user, site);
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("❌ Error getting password:", error);
    return null;
  }
}

// delete password
export async function deletePassword(site) {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    const key = makeKey(user, site);
    await SecureStore.deleteItemAsync(key);

    const listKey = `${user}:sites`;
    let sites = JSON.parse((await AsyncStorage.getItem(listKey)) || "[]");
    sites = sites.filter((s) => s !== site);
    await AsyncStorage.setItem(listKey, JSON.stringify(sites));
  } catch (error) {
    console.error("❌ Error deleting password:", error);
  }
}

// get all passwords
export async function getAllPasswords() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const listKey = `${user}:sites`;
    let sites = JSON.parse((await AsyncStorage.getItem(listKey)) || "[]");
    let results = [];

    for (let site of sites) {
      const key = makeKey(user, site);
      const value = await SecureStore.getItemAsync(key);
      if (value) results.push({ site, value });
    }

    return results;
  } catch (error) {
    console.error("❌ Error getting all passwords:", error);
    return [];
  }
}

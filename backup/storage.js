import * as SecureStore from 'expo-secure-store';

export async function savePassword(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getPassword(key) {
  return await SecureStore.getItemAsync(key);
}

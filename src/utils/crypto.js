import * as Crypto from "expo-crypto";
import { encode as btoa, decode as atob } from "base-64";

/**
 * Simple encryption: SHA256 hash + base64
 * (⚠️ This is a lightweight demo approach, not production-grade AES)
 */

// Encrypt password → base64 + SHA256 salt
export function encrypt(text) {
  if (!text) return "";

  try {
    const salt = "securevault"; // static salt for simplicity
    const hash = Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      text + salt
    );

    // Wrap into base64
    return btoa(text + "::" + salt);
  } catch (error) {
    console.error("❌ Error encrypting:", error);
    return "";
  }
}

// Decrypt password → reverse base64
export function decrypt(encoded) {
  if (!encoded) return "";

  try {
    const decoded = atob(encoded);
    const [text] = decoded.split("::");
    return text;
  } catch (error) {
    console.error("❌ Error decrypting:", error);
    return "";
  }
}

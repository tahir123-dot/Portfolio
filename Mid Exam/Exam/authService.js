import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  GoogleAuthProvider,
  signInWithCredential,
  browserLocalPersistence, // Use this for web
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "./firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: AsyncStorage
    ? require("firebase/auth").getReactNativePersistence(AsyncStorage)
    : browserLocalPersistence,
});

export const handleGoogleAuth = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const token = await userCredential.user.getIdToken();
    await AsyncStorage.setItem("token", token);
    return { success: true };
  } catch (error) {
    console.error("Google auth error:", error);
    return {
      success: false,
      error: error.message || "Google authentication failed",
    };
  }
};

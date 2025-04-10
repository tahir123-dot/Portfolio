import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import BaseUrl from "../config";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useGoogleAuth } from "../useGoogleAuth";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { promptAsync, request } = useGoogleAuth();

  const loginHandle = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);

        Alert.alert("Success", "Login successful!");
        router.push("/home");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Start your journey</Text>
      <Text style={styles.text2}>Sign in</Text>
      <View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>E-mail</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            style={styles.inputBox}
          />
        </View>
      </View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#DDDDDD"
        onPress={loginHandle}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.googleButton}
        underlayColor="#DDDDDD"
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </View>
      </TouchableHighlight>
      <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
        <Text>Create Account</Text>
        <TouchableHighlight underlayColor="#DDDDDD">
          <Link href="/signup">
            <Text style={{ color: "blue" }}>Sign up</Text>
          </Link>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text1: {
    fontSize: 13,
    marginVertical: 3,
  },
  text2: {
    fontSize: 25,
    marginVertical: 0,
    fontWeight: "500",
  },

  inputView: {
    marginTop: 20,
    position: "relative",
  },

  inputText: {
    position: "absolute",
    top: -7,
    left: 20,
    fontSize: 12,
    backgroundColor: "white",
    paddingHorizontal: 10,
    color: "blue",
    zIndex: 1,
  },
  inputBox: {
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    width: "100%",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    width: "100%",
    alignItems: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000000",
  },
});

export default login;

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import BaseUrl from "../config";

const Signup = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await fetch(`${BaseUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Save Token in AsyncStorage
                await AsyncStorage.setItem("token", data.token);
                
                Alert.alert("Success", "Signup successful!");
                router.push("/home"); // Navigate to home screen
            } else {
                Alert.alert("Error", data.message || "Signup failed");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
            console.error(error);
        }
        setLoading(false); // Stop loading
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text2}>Sign up</Text>
            <View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        keyboardType="default"
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>E-mail</Text>
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter email"
                        style={styles.inputBox}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Enter password"
                        style={styles.inputBox}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#0056b3"
                onPress={handleSignup}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Signing up..." : "Sign up"}
                </Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 30,
    },
    text2: {
        fontSize: 25,
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
});

export default Signup;

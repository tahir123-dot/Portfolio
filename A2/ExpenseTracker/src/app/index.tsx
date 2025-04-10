import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ Import useRouter

const Home = () => {
  const router = useRouter(); // ✅ Initialize router

  return (
    <ImageBackground
      source={require("../assets/images/Group 2.png")} // ✅ Background Image
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* ✅ Status Bar Fix */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* ✅ Main Content Area */}
        <View style={styles.container}>
          {/* ✅ Upar Character Image */}
          <Image
            source={require("../assets/images/Group 1.png")} // ✅ Replace this path with your image
            style={styles.character}
          />

          {/* ✅ Text Section */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Spend Smarter{"\n"}Save More</Text>
          </View>

          {/* ✅ Get Started Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/main")} // ✅ Correct
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* ✅ Login Text */}
          <Text style={styles.loginText}>
            Already Have Account? <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // ✅ Centering All Content
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center", // ✅ Perfect Center
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  character: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30, // ✅ Space Below Image
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#234F46",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#234F46",
    fontSize: 14,
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default Home;

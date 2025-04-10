import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0); // Animation for fade-in effect

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/1600x900/?travel,beach,mountains" }}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        
        <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.8)" translucent />
        <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]} style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
              <Text style={styles.title}>Book Your Dream Trip</Text>
              <Text style={styles.subtitle}>Flights, Trains & Buses</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.shadow]}
                  onPress={() => router.push("/search?type=flight")}
                >
                  <LinearGradient
                    colors={["#FF416C", "#FF4B2B"]}
                    style={styles.gradient}
                  >
                    <Ionicons name="airplane" size={24} color="#FFF" />
                    <Text style={styles.buttonText}>Flights</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.shadow]}
                  onPress={() => router.push("/search?type=train")}
                >
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={styles.gradient}
                  >
                    <Ionicons name="train" size={24} color="#FFF" />
                    <Text style={styles.buttonText}>Trains</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.shadow]}
                  onPress={() => router.push("/search?type=bus")}
                >
                  <LinearGradient
                    colors={["#00C9FF", "#92FE9D"]}
                    style={styles.gradient}
                  >
                    <Ionicons name="bus" size={24} color="#FFF" />
                    <Text style={styles.buttonText}>Buses</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.featuredSection}>
                <Text style={styles.sectionTitle}>Featured Destinations</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {["Paris", "New York", "Tokyo", "Dubai", "London"].map((city, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                      <ImageBackground
                        source={{ uri: `https://source.unsplash.com/300x300/?${city}` }}
                        style={styles.cardImage}
                        imageStyle={{ borderRadius: 20 }}
                      >
                        <LinearGradient
                          colors={["rgba(0,0,0,0.7)", "transparent"]}
                          style={styles.cardOverlay}
                        >
                          <Text style={styles.cardText}>{city}</Text>
                        </LinearGradient>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity
                style={[styles.exploreButton, styles.shadow]}
                onPress={() => router.push("/booking")}
              >
                <LinearGradient
                  colors={["#4CAF50", "#81C784"]}
                  style={styles.gradient}
                >
                  <MaterialIcons name="explore" size={24} color="#FFF" />
                  <Text style={styles.exploreText}>Explore More</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#DDD",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  featuredSection: {
    marginTop: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardOverlay: {
    padding: 10,
  },
  cardText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  exploreButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  exploreText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Home;
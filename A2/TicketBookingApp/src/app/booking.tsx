import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Booking = () => {
  const { ticket } = useLocalSearchParams();
  const parsedTicket = typeof ticket === "string" ? JSON.parse(ticket) : null;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!parsedTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid ticket data</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    alert("Booking Confirmed!");
  };

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/1600x900/?luxury,travel" }}
      style={styles.background}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)"]}
        style={styles.overlay}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.ticketCard}>
            <Text style={styles.title}>Confirm Booking</Text>
            <Text style={styles.ticketName}>{parsedTicket.name}</Text>
            <Text style={styles.ticketPrice}>${parsedTicket.price}</Text>
            <Text style={styles.ticketTime}>{parsedTicket.time}</Text>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <LinearGradient
                colors={["#FF416C", "#FF4B2B"]}
                style={styles.gradient}
              >
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.buttonText}>Confirm Booking</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
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
  container: {
    alignItems: "center",
    width: "90%",
  },
  ticketCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  ticketName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  ticketPrice: {
    fontSize: 20,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 10,
  },
  ticketTime: {
    fontSize: 18,
    color: "#DDD",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    borderRadius: 30,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default Booking;

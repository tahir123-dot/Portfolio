import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Ticket {
  id: string;
  name: string;
  price: number;
  time: string;
  type: string;
}

const ticketData: Ticket[] = [
  { id: "1", name: "VIP Ticket", price: 100, time: "10:00 AM", type: "VIP" },
  { id: "2", name: "Regular Ticket", price: 50, time: "12:00 PM", type: "Regular" },
];

const Results = () => {
  const router = useRouter();

  const handleSelectTicket = (ticket: Ticket) => {
    router.push({
      pathname: "/booking",
      params: { ticket: JSON.stringify(ticket) },
    });
  };

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      <Text style={styles.title}>🎟 Available Tickets</Text>
      <FlatList
        data={ticketData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.ticketCard} onPress={() => handleSelectTicket(item)}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketName}>{item.name}</Text>
              <View style={styles.row}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.ticketTime}>{item.time}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="pricetag-outline" size={20} color="#4CAF50" />
                <Text style={styles.ticketPrice}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  ticketCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  ticketInfo: {
    alignItems: "center",
  },
  ticketName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  ticketTime: {
    fontSize: 16,
    color: "#ddd",
    marginLeft: 5,
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

export default Results;

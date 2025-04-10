import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const notifications = [
  { id: 1, text: "John liked your post" },
  { id: 2, text: "Jane commented on your post" },
  { id: 3, text: "New follower: Alex" },
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notification: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notifications;
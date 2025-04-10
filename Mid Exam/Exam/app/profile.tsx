import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); 
      Alert.alert("Logout", "You have been logged out!");
      router.push("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/prof.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Tahir Rashid</Text>
        <Text style={styles.email}>tahirrashid736333@gmail.com</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>TahirRashid736</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+92 312 3456789</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Islamabad, Pakistan</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#007BFF",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "blue",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#FF3B30",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Profile;

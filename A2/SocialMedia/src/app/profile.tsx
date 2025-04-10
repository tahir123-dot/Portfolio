import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/men/1.jpg");

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.bio}>Software Developer | Travel Enthusiast</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});

export default Profile;
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const posts = [
  {
    id: 1,
    username: "john_doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    postImage: "https://picsum.photos/500/500",
    likes: 120,
    comments: 15,
    caption: "Enjoying the weekend!",
  },
  {
    id: 2,
    username: "jane_doe",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    postImage: "https://picsum.photos/500/501",
    likes: 200,
    comments: 30,
    caption: "Nature is beautiful!",
  },
];

const Home = () => {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handlePostClick = (postId: number) => {
    router.push({ pathname: "/postDetails", params: { postId } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Media</Text>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostClick(item.id)}>
            <View style={styles.post}>
              <View style={styles.postHeader}>
                <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <Image source={{ uri: item.postImage }} style={styles.postImage} />
              <View style={styles.postActions}>
                <TouchableOpacity onPress={() => handleLike(item.id)}>
                  <AntDesign
                    name={likedPosts.includes(item.id) ? "heart" : "hearto"}
                    size={24}
                    color={likedPosts.includes(item.id) ? "red" : "black"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.likes}>{item.likes + (likedPosts.includes(item.id) ? 1 : 0)} likes</Text>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={() => router.push("/createPost")}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  post: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postActions: {
    flexDirection: "row",
    padding: 10,
  },
  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  caption: {
    paddingHorizontal: 10,
  },
  createPostButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});

export default Home;
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const post = posts.find((p) => p.id === parseInt(postId as string));
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Image source={{ uri: post.postImage }} style={styles.postImage} />
        <View style={styles.postActions}>
          <TouchableOpacity onPress={handleLike}>
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.likes}>{post.likes + (liked ? 1 : 0)} likes</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text>{item}</Text>
            </View>
          )}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  commentSection: {
    flex: 1,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  commentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default PostDetails;
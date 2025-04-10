import { View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import Login from "./login";

const Index = () => {
  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Login />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Index;

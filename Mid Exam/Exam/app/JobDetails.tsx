import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  JobDetails: { job: { title: string; company: string; salary_from: number } };
};

type JobDetailsRouteProp = RouteProp<RootStackParamList, "JobDetails">;

const JobDetailsScreen = () => {
  const route = useRoute<JobDetailsRouteProp>();
  const { job } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{job.title}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>{job.company}</Text>
      <Text style={{ fontSize: 16, color: "green" }}>💰 {job.salary_from}</Text>
    </View>
  );
};

export default JobDetailsScreen;

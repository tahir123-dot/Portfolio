import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import BaseUrl from "../config";
import { Link } from "expo-router";

interface Job {
  _id: string;
  title: string;
  company: string;
  salary_from: number;
  application_deadline: string;
  description: string;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${BaseUrl}/jobs`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const validatedJobs = Array.isArray(data)
        ? data.map((job) => ({
            _id: job._id || "",
            title: job.title || "No title",
            company: job.company || "No company",
            salary_from: job.salary_from || 0,
            application_deadline: job.application_deadline || "No deadline",
            description: job.description || "No description",
          }))
        : [];

      setJobs(validatedJobs);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
          Job Listings
        </Text>
        <Link href="/profile">
          <Image
            source={require("@/assets/images/prof.jpg")}
            style={{
              width: 60,
              height: 60,
              objectFit: "contain",
              borderRadius: 50,
              borderWidth: 3,
              borderColor: "blue",
            }}
          />
        </Link>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 16,
              padding: 16,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#ddd",
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {item.title}
            </Text>
            <Text style={{ marginBottom: 4 }}>Company: {item.company}</Text>
            <Text style={{ marginBottom: 4 }}>
              Salary: ${item.salary_from.toLocaleString()}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              Deadline:{" "}
              {new Date(item.application_deadline).toLocaleDateString()}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              Description: {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No jobs available
          </Text>
        }
      />
    </View>
  );
};

export default Home;

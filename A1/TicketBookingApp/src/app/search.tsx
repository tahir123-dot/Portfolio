import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons"; // Icons added

const Search = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string | string[] }>();

  const typeString = Array.isArray(type) ? type[0] : type;
  const formattedType =
    typeString?.charAt(0).toUpperCase() + typeString?.slice(1);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep picker open on iOS
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = () => {
    router.push({
      pathname: "/results",
      params: { type: typeString, from, to, date: date.toISOString().split("T")[0] },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search {formattedType}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="From"
          value={from}
          onChangeText={setFrom}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="To"
          value={to}
          onChangeText={setTo}
        />
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar-outline" size={24} color="#555" />
        <Text style={styles.dateText}>
          {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 3, // Shadow effect
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Search;

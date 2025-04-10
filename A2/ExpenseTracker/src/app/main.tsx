import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Main = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Upwork", date: "Today", amount: 850.0, type: "income" },
    {
      id: 2,
      name: "Transfer",
      date: "Yesterday",
      amount: 85.0,
      type: "expense",
    },
    {
      id: 3,
      name: "Paypal",
      date: "Jan 30, 2022",
      amount: 1406.0,
      type: "income",
    },
    {
      id: 4,
      name: "Youtube",
      date: "Jan 16, 2022",
      amount: 11.99,
      type: "expense",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      name: expenseName,
      date: expenseDate || new Date().toLocaleDateString(),
      amount: parseFloat(expenseAmount),
      type: "expense",
    };
    setTransactions([...transactions, newTransaction]);
    setModalVisible(false);
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDate("");
  };

  const totalBalance = transactions.reduce(
    (acc, curr) =>
      curr.type === "income" ? acc + curr.amount : acc - curr.amount,
    0
  );
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good afternoon,</Text>
      <Text style={styles.name}>Enjelin Morgeana</Text>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$ {totalBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeContainer}>
          <Text style={styles.incomeLabel}>Income</Text>
          <Text style={styles.incomeAmount}>$ {totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseLabel}>Expenses</Text>
          <Text style={styles.expenseAmount}>$ {totalExpenses.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsLabel}>Transactions History</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={
                transaction.type === "income"
                  ? styles.transactionIncome
                  : styles.transactionExpense
              }
            >
              {transaction.type === "income" ? "+" : "-"} ${" "}
              {transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Expense Name"
              value={expenseName}
              onChangeText={setExpenseName}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (optional)"
              value={expenseDate}
              onChangeText={setExpenseDate}
            />
            <Button title="Add" onPress={addTransaction} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
    backgroundColor: "#f5f5f5",
  },
  greeting: {
    fontSize: 18,
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  balanceContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#666",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  incomeContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  expenseContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  incomeLabel: {
    fontSize: 16,
    color: "#666",
  },
  incomeAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  expenseLabel: {
    fontSize: 16,
    color: "#666",
  },
  expenseAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F44336",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transactionsLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#666",
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
  },
  transactionIncome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  transactionExpense: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Main;

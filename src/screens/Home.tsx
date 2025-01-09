import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/Header/AppHeader";
import { EmptyComponent } from "../components/EmptyComponent/EmptyComponent";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ExpenseCard from "../components/ExpenseCard/ExpenseCard";
import { deleteExpense } from "../slices/expensesSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialIcons } from "react-native-vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface HomeProps {
  expenses: Expense[];
}

const Home = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const { expenses }: HomeProps = useSelector((state: any) => state.expense);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleDeleteExpense = (expenseId: number) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteExpense(expenseId));
          },
        },
      ]
    );
  };

  const filterExpensesByDate = () => {
    if (!selectedStartDate && !selectedEndDate) return expenses;

    return expenses.filter((expense: any) => {
      const expenseDate = moment(expense.date, "YYYY-MM-DD");
      const isAfterStartDate =
        !selectedStartDate ||
        expenseDate.isSameOrAfter(moment(selectedStartDate, "YYYY-MM-DD"));
      const isBeforeEndDate =
        !selectedEndDate ||
        expenseDate.isSameOrBefore(moment(selectedEndDate, "YYYY-MM-DD"));
      return isAfterStartDate && isBeforeEndDate;
    });
  };

  const clearFilter = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const _renderExpenseList = ({ item }: any) => {
    return (
      <ExpenseCard
        data={item}
        onPress={() =>
          navigation?.navigate("AddExpense", {
            expenseData: item,
          })
        }
        onDeleteExpense={() => handleDeleteExpense(item.id)}
      />
    );
  };

  const expensesToDisplay = filterExpensesByDate();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* App Header */}
      <AppHeader
        isLogo={true}
        title={"Expense List"}
        isAction={true}
        onAction={() => {
          navigation?.navigate("AddExpense", {
            expenseData: {},
          });
        }}
      />
      <View style={{ padding: 16 }}>
        {/* Date Filter UI */}
        <Text
          style={{ color: COLORS.textColor, fontSize: 16, marginBottom: 10 }}
        >
          Filter by Date:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {/* Start Date Picker */}
          <View>
            <Button
              title="Select Start Date"
              onPress={() => setShowStartPicker(true)}
            />
            {selectedStartDate && (
              <Text style={{ color: COLORS.textColor, marginTop: 5 }}>
                Start Date: {moment(selectedStartDate).format("YYYY-MM-DD")}
              </Text>
            )}
          </View>

          {/* End Date Picker */}
          <View>
            <Button
              title="Select End Date"
              onPress={() => setShowEndPicker(true)}
            />
            {selectedEndDate && (
              <Text style={{ color: COLORS.textColor, marginTop: 5 }}>
                End Date: {moment(selectedEndDate).format("YYYY-MM-DD")}
              </Text>
            )}
          </View>
        </View>

        {/* Clear Filter Button */}
        {selectedStartDate && selectedEndDate && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
            <Text style={styles.clearButtonText}>Clear Filter</Text>
          </TouchableOpacity>
        )}

        {/* Date Picker Modals */}
        {showStartPicker && (
          <DateTimePicker
            value={selectedStartDate ? new Date(selectedStartDate) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setSelectedStartDate(moment(date).format("YYYY-MM-DD"));
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={selectedEndDate ? new Date(selectedEndDate) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setSelectedEndDate(moment(date).format("YYYY-MM-DD"));
            }}
          />
        )}
      </View>

      <FlatList
        data={expensesToDisplay}
        showsVerticalScrollIndicator={false}
        renderItem={_renderExpenseList}
        keyExtractor={(item: any, index: any) => `${item.type}_${index}`}
        ListEmptyComponent={<EmptyComponent />}
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation?.navigate("Chart")}
      >
        <MaterialIcons name="bar-chart" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    backgroundColor: COLORS.lightBorder,
    paddingVertical: wp(2),
    borderRadius: wp(2),
    alignItems: "center",
    marginBottom: wp(2),
  },
  clearButtonText: {
    color: COLORS.white,
    fontSize: wp(4),
    fontWeight: "600",
  },
  floatingButton: {
    position: "absolute",
    bottom: wp(8),
    right: wp(8),
    backgroundColor: COLORS.lightBorder,
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Home;

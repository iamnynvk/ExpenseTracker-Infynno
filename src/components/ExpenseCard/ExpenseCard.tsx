import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IExpenseCardProps } from "../../types";

const ExpenseCard = ({ data, onPress, onDeleteExpense }: IExpenseCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>$ {data?.amount}</Text>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{data?.title}</Text>
        <Text style={styles.subtitleText}>{data?.category}</Text>
      </View>

      {/* Action Section */}
      <View style={styles.actionContainer}>
        <Text style={styles.dateText}>{data?.date}</Text>
        <MaterialCommunityIcons
          name="delete-forever-outline"
          size={wp(7)}
          color={COLORS.danger}
          style={styles.deleteIcon}
          onPress={onDeleteExpense}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.cardColor,
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  priceContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.borderLines,
    paddingRight: wp(2),
  },
  priceText: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: COLORS.textColor,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingLeft: wp(3),
  },
  titleText: {
    fontSize: wp(4),
    color: COLORS.textColor,
    fontWeight: "600",
  },
  subtitleText: {
    fontSize: wp(3.5),
    color: COLORS.borderLines,
    marginTop: hp(0.5),
  },
  actionContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: wp(3.5),
    color: COLORS.borderLines,
    marginBottom: hp(0.5),
  },
  deleteIcon: {
    padding: wp(1),
  },
});

export default ExpenseCard;

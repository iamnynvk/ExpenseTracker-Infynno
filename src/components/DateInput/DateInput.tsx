import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../constants";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SCREEN_WIDTH } from "../../constants/theme";
import moment from "moment";
import { IDateInputProps } from "../../types";

const DateInput = ({ value, setFieldValue, name }: IDateInputProps) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setFieldValue(name, moment(selectedDate).format("YYYY-MM-DD"));
    }
  };

  const currentDate = new Date();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dateInput}
        onPress={() => setShow(true)}
      >
        <Text style={styles.dateText}>{value || "Select Date"}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : currentDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={currentDate}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: wp(4),
    width: SCREEN_WIDTH / 1.2,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: COLORS.borderLines,
    backgroundColor: COLORS.inputColor,
    width: SCREEN_WIDTH / 1.2,
    height: wp(12),
    borderRadius: wp(2.4),
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  dateText: {
    color: COLORS.borderLines,
    fontSize: wp(3.9),
  },
});

export default DateInput;

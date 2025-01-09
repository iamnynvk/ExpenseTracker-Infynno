import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants";
import { ISubmitButton } from "../../types";
import { SCREEN_WIDTH } from "../../constants/theme";

const SubmitButton = ({
  isDisable,
  handleSubmitButton,
  isLoading,
  title,
}: ISubmitButton) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisable}
        style={[
          styles.buttonStyles,
          {
            opacity: isDisable ? 0.5 : 1,
          },
        ]}
        onPress={handleSubmitButton}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.textContainer}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(12),
    width: SCREEN_WIDTH / 1.2,
    borderRadius: wp(100),
    backgroundColor: COLORS.lightBorder,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonStyles: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    color: COLORS.white,
    fontSize: wp(5),
  },
});

export default SubmitButton;

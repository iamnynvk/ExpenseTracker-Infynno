import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, SCREEN_HEIGHT } from "../../constants/theme";

export const EmptyComponent = ({ contentStyles }: any) => {
  return (
    <View
      style={[
        styles.emptyContainer,
        { alignItems: "center", ...contentStyles },
      ]}
    >
      <Text style={styles.errorMessage}>
        Oops! It seems like there's nothing here right now.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: SCREEN_HEIGHT / 3.8,
  },
  errorMessage: {
    color: COLORS.textColor,
    fontSize: wp(4),
    textAlign: "center",
  },
});

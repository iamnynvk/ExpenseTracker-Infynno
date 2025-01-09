import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, images } from "../../constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { IHeaderProps } from "../../types";

const AppHeader = ({
  isBack = false,
  isLogo = false,
  isClose = false,
  isAction = false,
  title,
  onClose,
  onAction,
}: IHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Back container */}
      <View style={styles.backContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => isClose && onClose()}
        >
          {isBack && (
            <Ionicons name="chevron-back" color={COLORS.black} size={wp(7)} />
          )}
          {isLogo && (
            <Image
              source={images.img_header_logo}
              style={styles.iconStyles}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
      {/* Title container */}
      <View style={styles.titleContainer}>
        <Text style={styles.textStyles}>{title}</Text>
      </View>
      {/* Action container */}
      <View style={styles.actionContainer}>
        {isAction && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ alignSelf: "center" }}
            onPress={onAction}
          >
            <Octicons name="plus-circle" color={COLORS.black} size={wp(7)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(6.5),
    backgroundColor: COLORS.whiteGreen,
    flexDirection: "row",
  },
  backContainer: {
    flex: 0.15,
    justifyContent: "center",
  },
  iconStyles: {
    height: wp(8),
    width: wp(8),
    alignSelf: "flex-start",
    marginStart: wp(4),
  },
  titleContainer: {
    flex: 0.72,
    justifyContent: "center",
  },
  textStyles: {
    fontSize: wp(5),
    fontWeight: "bold",
  },
  actionContainer: {
    flex: 0.13,
    justifyContent: "center",
  },
});

export default AppHeader;

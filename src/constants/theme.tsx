import { Dimensions, Platform } from "react-native";

export const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  danger: "#F44336",
  lightBorder: "#0b66c3",
  borderLines: "#4A4E51",
  textColor: "#262626",
  inputColor: "#f9fafc",
  background: "#F9F6E6",
  secondary: "#E1EACD",
  whiteGreen: "#BAD8B6",
  lightBlue: "#a8a8a8",
  cardColor: "#F8E1B7",
};

export const SCREEN_HEIGHT: any = Dimensions.get("screen").height;
export const SCREEN_WIDTH: any = Dimensions.get("screen").width;

export const IOS_DEVICE = Platform.OS === "ios";
export const ANDROID_DEVICE = Platform.OS === "android";

const appTheme = { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH };

export default appTheme;

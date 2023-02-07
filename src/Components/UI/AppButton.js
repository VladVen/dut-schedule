import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";
import { useTheme } from "react-native-paper";

const AppButton = ({
  children,
  onPress,
  color,
  size = "m",
  disabled = false,
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  const theme = useTheme();
  return (
    <Wrapper onPress={onPress} activeOpacity={0.6} disabled={disabled}>
      <View style={style.default}>
        <AppText
          style={{ ...style.text }}
          size={size}
          color={
            disabled
              ? theme.colors.disabledColor
              : color
              ? color
              : theme.colors.textColor
          }
        >
          {children}
        </AppText>
      </View>
    </Wrapper>
  );
};

const style = StyleSheet.create({
  default: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppButton;

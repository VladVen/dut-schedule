import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { THEME } from "../../../Theme";
import AppText from "./AppText";

const AppButton = ({
  children,
  onPress,
  color = THEME.textColor,
  size = "m",
  disabled = false,
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.6} disabled={disabled}>
      <View style={style.default}>
        <AppText
          style={{ ...style.text, color: disabled ? THEME.disabled : color }}
          size={size}
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

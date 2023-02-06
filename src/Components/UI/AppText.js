import React from "react";
import { StyleSheet, Text } from "react-native";
import {THEME} from "../../../Theme";

const AppText = ({ style, children, size = "m" }) => {
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: size === "s" ? 15 : size === "l" ? 22 : 18,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
      color: THEME.textColor,
    fontFamily: "eUkraine",
    textAlign: "center",
  },
});

export default AppText;

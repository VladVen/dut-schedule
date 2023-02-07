import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

const AppText = ({ style, children, color, size = "m" }) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: size === "s" ? 15 : size === "l" ? 22 : 18,
        color: color || theme.colors.textColor,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "eUkraine",
    textAlign: "center",
  },
});

export default AppText;

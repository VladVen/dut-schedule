import React from "react";
import { StyleSheet, Text } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { Sizes } from "../../../types/sizes";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface IAppText {
  style?: TextStyle;
  children: React.ReactNode;
  color?: string;
  size?: Sizes;
}

const AppText: React.FC<IAppText> = ({
  style,
  children,
  color,
  size = Sizes.medium,
}) => {
  const theme = useAppTheme();
  return (
    <Text
      style={{
        ...styles.default,
        ...style,
        fontSize: size,
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

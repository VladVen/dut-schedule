import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";
import { Sizes } from "../../../types/sizes";
import { useAppTheme } from "../../../hooks/useAppTheme";

interface IAppButton {
  children: React.ReactNode;
  onPress: () => void;
  color?: string;
  size?: Sizes;
  disabled?: boolean;
}

const AppButton: React.FC<IAppButton> = ({
  children,
  onPress,
  color,
  size = Sizes.medium,
  disabled = false,
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  const theme = useAppTheme();
  return (
    // @ts-ignore
    <Wrapper onPress={onPress} activeOpacity={0.6} disabled={disabled}>
      <View style={style.default}>
        <AppText
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

import React from "react";
import { View } from "react-native";
import { container } from "../../theme/Theme";
import AppButton from "../Components/UI/AppButton";
import { localisation } from "../localisation/localisation";
import { useAppSelector } from "../../hooks/redux";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Sizes } from "../../types/sizes";
import {
  RoutesStack,
  ScreenNavigationProps,
} from "../Navigation/AppNavigation.types";

export const LoginScreen = ({
  navigation,
}: ScreenNavigationProps<RoutesStack.Login>) => {
  const lang = useAppSelector((state) => state.settings.lang);
  const localise = localisation(lang);
  const theme = useAppTheme();

  return (
    <View
      style={{ ...container(theme.colors.background), flexDirection: "column" }}
    >
      <AppButton
        onPress={() => navigation.navigate(RoutesStack.Student)}
        size={Sizes.large}
      >
        {localise.login.student}
      </AppButton>
      <AppButton
        onPress={() => navigation.navigate(RoutesStack.Teacher)}
        size={Sizes.large}
      >
        {localise.login.teacher}
      </AppButton>
    </View>
  );
};


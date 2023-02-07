import React from "react";
import { View } from "react-native";
import { container } from "../../Theme";
import AppButton from "../Components/UI/AppButton";
import { useSelector } from "react-redux";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

export const LoginScreen = ({ navigation }) => {
  const lang = useSelector((state) => state.settings.lang);
  const localise = localisation(lang);
  const theme = useTheme();

  return (
    <View
      style={{ ...container(theme.colors.background), flexDirection: "column" }}
    >
      <AppButton onPress={() => navigation.navigate("Student")} size={"l"}>
        {localise.login.student}
      </AppButton>
      <AppButton onPress={() => navigation.navigate("Teacher")} size={"l"}>
        {localise.login.teacher}
      </AppButton>
    </View>
  );
};


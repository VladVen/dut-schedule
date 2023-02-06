import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../../Theme";
import AppButton from "../Components/UI/AppButton";
import {useSelector} from "react-redux";
import {localisation} from "../localisation/localisation";

export const LoginScreen = ({ navigation }) => {

    const lang = useSelector((state) => state.settings.lang);
    const localise = localisation(lang)

  return (
    <View style={styles.container}>
      <AppButton onPress={() => navigation.navigate("Student")} size={"l"}>
          {localise.login.student}
      </AppButton>
      <AppButton onPress={() => navigation.navigate("Teacher")} size={"l"}>
          {localise.login.teacher}
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
  },
});

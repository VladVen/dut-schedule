import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../../Theme";
import AppButton from "../Components/UI/AppButton";

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppButton onPress={() => navigation.navigate("Student")} size={"l"}>
        Student
      </AppButton>
      <AppButton onPress={() => navigation.navigate("Teacher")} size={"l"}>
        Teacher
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

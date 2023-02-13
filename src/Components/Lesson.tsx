import { StyleSheet, Text, View } from "react-native";
import AppText from "./UI/AppText";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Sizes } from "../../types/sizes";
import React from "react";

interface ILesson {
  lesson: string;
  time: string;
}

export const Lesson: React.FC<ILesson> = ({ lesson, time }) => {
  if (!lesson) {
    return null;
  }
  const theme = useAppTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.cardColor }}
    >
      <Text
        style={{
          flex: 1,
          color: theme.colors.textColor,
          fontSize: 13,
          fontFamily: "eUkraine",
          marginLeft: 5,
        }}
      >
        {lesson.slice(0, lesson.length - 27)}
      </Text>
      <AppText
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
          color: theme.colors.textColor,
        }}
        size={Sizes.large}
      >
        {time}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 200,
    alignItems: "flex-start",
    paddingLeft: 5,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 10,
  },
});

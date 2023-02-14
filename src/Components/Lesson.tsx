import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./UI/AppText";
import { useAppTheme } from "../../hooks/useAppTheme";
import React, { useState } from "react";

interface ILesson {
  lesson: string;
  time: string;
}

export const Lesson: React.FC<ILesson> = ({ lesson, time }) => {
  if (!lesson) {
    return null;
  }
  const theme = useAppTheme();

  const [touched, setTouched] = useState(false);
  const background = () => {
    if (lesson.includes("[Пз]")) return theme.colors.cardColor.pz;
    else if (lesson.includes("[Лк]")) return theme.colors.cardColor.lk;
    else if (lesson.includes("[Лб]")) return theme.colors.cardColor.lb;
    else if (lesson.includes("[Зач]")) return theme.colors.cardColor.zal;
    else if (lesson.includes("[Экз]")) return theme.colors.cardColor.ekz;
    else if (lesson.includes("[Доп]")) return theme.colors.cardColor.dop;
    else if (lesson.includes("[Сем]")) return theme.colors.cardColor.sem;
    else {
      return theme.colors.cardColor.pz;
    }
  };

  const lessonSplit = lesson.split(/\n/).filter((item) => item);

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: background(),
      }}
      onPress={() => setTouched(prevState => !prevState)}
    >
      <AppText
        style={{
          flex: 1,
        }}
      >
        {touched ? lesson : lessonSplit[0] }
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          justifyContent: 'space-around'
        }}
      >
        {!touched && <AppText >{lessonSplit[2]}</AppText>}
        <AppText >{time}</AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingLeft: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 8,
    padding: 10,
    borderRadius: 10,

  },
});

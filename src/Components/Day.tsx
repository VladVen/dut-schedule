import { ScrollView, StyleSheet, View } from "react-native";
import { Lesson } from "./Lesson";
import AppText from "./UI/AppText";
import { localisation } from "../../localisation/localisation";
import { useAppSelector } from "../../hooks/redux";
import { useAppTheme } from "../../hooks/useAppTheme";
import React from "react";
import {IDay} from "../../types/schedule.types";

interface IDayProps {
  schedule: IDay;
}

export const Day: React.FC<IDayProps> = ({ schedule }) => {
  const lang = useAppSelector((state) => state.settings.lang);
  const theme = useAppTheme();
  const localise = localisation(lang);

  const noLessons = (schedule.info.length === 1 && !schedule.info[0].subject) ||  !schedule.info.length

  return (
    <View style={styles.container}>
      <AppText>{schedule.date}</AppText>

      {noLessons ? (
          <View
              style={{ ...styles.freeDayArea, backgroundColor: theme.colors.cardColor.dop }}
          >
            <AppText style={{ color: theme.colors.textColor }}>
              {localise.freeDay}
            </AppText>
          </View>
      ) : (
          <ScrollView>
            {schedule.info.map((subj, index) => (
                <Lesson
                    lesson={`${subj.subject.split("<br>").join("\n")}`}
                    time={subj.time}
                    key={index}
                />
            ))}
          </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
  },
  freeDayArea: {
    padding: 25,
    margin: 10,
    borderRadius: 10,
  },
});

import { ScrollView, StyleSheet, View } from "react-native";
import { Lesson } from "./Lesson";
import AppText from "./UI/AppText";
import { useTheme } from "react-native-paper";
import {localisation} from "../localisation/localisation";
import {useSelector} from "react-redux";

export const Day = ({ schedule }) => {

  const lang = useSelector((state) => state.settings.lang);
  const theme = useTheme();
  const localise = localisation(lang);


  return (
    <View style={styles.container}>
      <AppText>{schedule.date}</AppText>

      {schedule.info.length > 1 ? (
        <ScrollView>
          {schedule.info.map((subj, index) => (
            <Lesson
              lesson={`${subj.subject.split("<br>").join("\n")}`}
              time={subj.time}
              key={index}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{...styles.freeDay, backgroundColor: theme.colors.cardColor}}>
          <AppText style={{ color: theme.colors.textColor }}>
            {localise.freeDay}
          </AppText>
        </View>
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
  freeDay: {
    padding: 25,
    margin: 10,
    borderRadius: 10,
  },
});

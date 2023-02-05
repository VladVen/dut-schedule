import { ScrollView, StyleSheet, Text, View } from "react-native";
import { THEME } from "../../Theme";
import { Lesson } from "./Lesson";
import AppText from "./UI/AppText";

export const Day = ({ schedule }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{schedule.date}</Text>

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
        <View style={styles.freeDay}>
          <AppText style={{ color: THEME.textColor }}>
            Today you are free
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
    backgroundColor: "black",
  },
  date: {
    fontFamily: "eUkraine",
    marginRight: "auto",
    marginLeft: "auto",
    color: THEME.textColor,
  },
});

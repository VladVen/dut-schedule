import { ScrollView } from "react-native";
import { Day } from "./Day";
import { useTheme } from "react-native-paper";

export const Week = ({ schedule }) => {
  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {schedule.map((item, index) => (
        <Day schedule={item} key={index} />
      ))}
    </ScrollView>
  );
};



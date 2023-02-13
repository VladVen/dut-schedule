import { ScrollView } from "react-native";
import { Day } from "./Day";
import { useTheme } from "react-native-paper";
import {IWeek} from "../../types/schedule.types";
import {FC} from "react";

interface WeekProps {
  schedule: IWeek
}
export const Week: FC<WeekProps> = ({ schedule }) => {
  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {schedule.map((item, index) => (
        <Day schedule={item} key={index} />
      ))}
    </ScrollView>
  );
};



import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { container } from "../../Theme";
import { getSchedule } from "../../redux/scheduleReducer";
import { DayScreenTabs } from "../Components/DayScreenTabs";
import { useTheme } from "react-native-paper";

export const DayScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.schedule.fetching);
  const group = useSelector((state) => state.login.myData.group);
  const teacher = useSelector((state) => state.loginTeacher.myData.teacher);
  const theme = useTheme();

  const getData = useCallback(async () => {
    if (!group) {
      await dispatch(getSchedule(teacher, "teacher"));
    } else {
      await dispatch(getSchedule(group));
    }
  }, [getSchedule]);

  useEffect(() => {
    getData();
  }, []);

  if (fetching) {
    return (
      <View style={container(theme.colors.background)}>
        <ActivityIndicator color={theme.colors.textColor} size={"large"} />
      </View>
    );
  }

  return <DayScreenTabs navigation={navigation} />;
};



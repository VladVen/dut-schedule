import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../redux/scheduleReducer";
import { DayScreenTabs } from "../Components/DayScreenTabs";
import { useTheme } from "react-native-paper";
import { AppPreloader } from "../Components/UI/AppPreloader";

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
      <AppPreloader
        background={theme.colors.background}
        color={theme.colors.textColor}
      />
    );
  }

  return <DayScreenTabs navigation={navigation} />;
};



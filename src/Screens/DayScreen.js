import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../../Theme";
import { getSchedule } from "../../redux/scheduleReducer";
import { DayScreenTabs } from "../Components/DayScreenTabs";

export const DayScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.schedule.fetching);
  const group = useSelector((state) => state.login.myData.group);
  const teacher = useSelector((state) => state.loginTeacher.myData.teacher);

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
      <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={"large"} />
      </View>
    );
  }

  return <DayScreenTabs navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
  },
});

import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../../Theme";
import { SelectModal } from "../Components/SelectModal";
import {
  getDepartment,
  getTeacher,
  saveTeacher,
} from "../../redux/loginTeacherReducer";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";

export const TeacherScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const department = useSelector(
    (state) => state.loginTeacher.selectData.department
  );
  const teacher = useSelector((state) => state.loginTeacher.selectData.teacher);
  const [openDep, setOpenDep] = useState(false);
  const [selectedDep, setSelectedDep] = useState("Select your Department");
  const [openTeacher, setOpenTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("Select you");

  const loadDep = useCallback(
    async () => await dispatch(getDepartment()),
    [getDepartment]
  );

  useEffect(() => {
    loadDep();
  }, []);

  if (!department.length)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <AppButton onPress={() => setOpenDep(true)} size={"l"}>
          {selectedDep}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenTeacher(true)}
          disabled={!teacher.length || selectedDep === "Select your Department"}
          size={"l"}
        >
          {selectedTeacher}
        </AppButton>
      </View>

      <SelectModal
        data={department}
        visible={openDep}
        setVisible={setOpenDep}
        setSelected={setSelectedDep}
        dispatchMethod={(val) => {
          dispatch(getTeacher(val));
          setSelectedTeacher("Select you");
        }}
      />
      <SelectModal
        data={teacher}
        visible={openTeacher}
        setVisible={setOpenTeacher}
        setSelected={setSelectedTeacher}
        dispatchMethod={async (val) => {
          dispatch(saveTeacher(val));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Footer",
                },
              ],
            })
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
  },
  margin: {
    marginBottom: 20,
  },
});

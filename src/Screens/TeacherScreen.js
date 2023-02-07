import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { container } from "../../Theme";
import { SelectModal } from "../Components/SelectModal";
import {
  getDepartment,
  getTeacher,
  saveTeacher,
  saveTeacherName,
} from "../../redux/loginTeacherReducer";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

export const TeacherScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const department = useSelector(
    (state) => state.loginTeacher.selectData.department
  );
  const teacher = useSelector((state) => state.loginTeacher.selectData.teacher);
  const [openDep, setOpenDep] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);

  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const [selectedDep, setSelectedDep] = useState(
    () => localise.teacher.department
  );
  const [selectedTeacher, setSelectedTeacher] = useState(
    () => localise.teacher.you
  );

  const loadDep = useCallback(
    async () => await dispatch(getDepartment()),
    [getDepartment]
  );

  useEffect(() => {
    loadDep();
  }, []);

  if (!department.length)
    return (
      <View style={container(theme.colors.background)}>
        <ActivityIndicator color={theme.colors.textColor} size={"large"} />
      </View>
    );

  return (
    <View style={container(theme.colors.background)}>
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
          setSelectedTeacher(localise.teacher.you);
        }}
      />
      <SelectModal
        data={teacher}
        visible={openTeacher}
        setVisible={setOpenTeacher}
        setSelected={(name) => {
          setSelectedTeacher(name);
          dispatch(saveTeacherName(name));
        }}
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
    margin: {
        marginBottom: 20,
    },
});

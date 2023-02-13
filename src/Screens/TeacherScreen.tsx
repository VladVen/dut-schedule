import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../theme/Theme";
import { SelectModal } from "../Components/SelectModal";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";
import { localisation } from "../localisation/localisation";
import { AppPreloader } from "../Components/UI/AppPreloader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppTheme } from "../../hooks/useAppTheme";
import { IList } from "../../types/list.types";
import { selectDepartment } from "../../parser/selectDepartment";
import { Sizes } from "../../types/sizes";
import { selectTeacher } from "../../parser/selectTeacher";
import { LoginSlice } from "../../store/reducers/login/loginSlice";

export const TeacherScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const [department, setDepartment] = useState<IList[]>([]);
  const [teachers, setTeachers] = useState<IList[]>([]);

  const [openDep, setOpenDep] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);

  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const [selectedDep, setSelectedDep] = useState(() => ({
    name: localise.teacher.department,
    value: null,
  }));
  const [selectedTeacher, setSelectedTeacher] = useState(() => ({
    name: localise.teacher.you,
    value: null,
  }));

  const { setLogin } = LoginSlice.actions;

  const loadDep = useCallback(async () => {
    const depart = await selectDepartment("teacher");
    setDepartment(depart);
  }, [selectDepartment]);

  useEffect(() => {
    loadDep();
  }, []);

  const onDepartmentSelect = async (data: IList) => {
    setSelectedDep(data);
    const teachers = await selectTeacher(data.value);
    setTeachers(teachers);
  };
  const onTeacherSelect = async (data: IList) => {
    setSelectedTeacher(data);
    dispatch(
      setLogin({ name: data.name, id: data.value, category: "teacher" })
    );
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
  };

  if (!department.length)
    return (
      <AppPreloader
        background={theme.colors.background}
        color={theme.colors.textColor}
      />
    );

  return (
    <View style={container(theme.colors.background)}>
      <View style={styles.margin}>
        <AppButton onPress={() => setOpenDep(true)} size={Sizes.large}>
          {selectedDep.name}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenTeacher(true)}
          disabled={
            !teachers.length || selectedDep.name === localise.teacher.you
          }
          size={Sizes.large}
        >
          {selectedTeacher.name}
        </AppButton>
      </View>

      <SelectModal
        data={department}
        visible={openDep}
        setVisible={setOpenDep}
        dispatchMethod={onDepartmentSelect}
      />
      <SelectModal
        data={teachers}
        visible={openTeacher}
        setVisible={setOpenTeacher}
        dispatchMethod={onTeacherSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    margin: {
        marginBottom: 20,
    },
});

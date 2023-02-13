import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../theme/Theme";
import { SelectModal } from "../Components/SelectModal";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";
import { localisation } from "../localisation/localisation";
import { AppPreloader } from "../Components/UI/AppPreloader";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  RoutesStack,
  ScreenNavigationProps,
} from "../Navigation/AppNavigation.types";
import { selectDepartment } from "../../parser/selectDepartment";
import { IList } from "../../types/list.types";
import { Sizes } from "../../types/sizes";
import { selectCourse } from "../../parser/selectCourse";
import { selectGroup } from "../../parser/selectGroup";
import { LoginSlice } from "../../store/reducers/login/loginSlice";
import { InternetAlert } from "../Components/InternetAlert";

export const StudentScreen = ({
  navigation,
}: ScreenNavigationProps<RoutesStack.Student>) => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const [inst, setInst] = useState<IList[]>([]);
  const [course, setCourse] = useState<IList[]>([]);
  const [group, setGroup] = useState<IList[]>([]);

  const [openInst, setOpenInst] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  const [error, setError] = useState("");

  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const { setLogin } = LoginSlice.actions;

  const [selectedInst, setSelectedInst] = useState(() => ({
    name: localise.student.inst,
    value: null,
  }));
  const [selectedCourse, setSelectedCourse] = useState(() => ({
    name: localise.student.course,
    value: null,
  }));
  const [selectedGroup, setSelectedGroup] = useState(() => ({
    name: localise.student.group,
    value: null,
  }));

  const loadInst = useCallback(async () => {
    try {
      const inst = await selectDepartment("group");
      setInst(inst);
    } catch (e) {
      setError("Internet Error");
    }
  }, [selectDepartment]);

  useEffect(() => {
    loadInst();
  }, []);

  const onDepartmentSelect = async (data: IList) => {
    try {
      setSelectedInst(data);
      setSelectedCourse((prevState) => ({
        ...prevState,
        name: localise.student.course,
        value: null,
      }));
      const courses = await selectCourse(data.value);
      setCourse(courses);
    } catch (e) {
      setError("Internet Error");
    }
  };
  const onCourseSelect = async (data: IList) => {
    try {
      setSelectedCourse(data);
      setSelectedGroup((prevState) => ({
        ...prevState,
        name: localise.student.group,
        value: null,
      }));
      const groups = await selectGroup(selectedInst.value, data.value);
      setGroup(groups);
    } catch (e) {
      setError("Internet Error");
    }
  };
  const onGroupSelect = async (data: IList) => {
    try {
      setSelectedGroup(data);
      dispatch(
        setLogin({ name: data.name, id: data.value, category: "group" })
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
    } catch (e) {
      setError("Internet Error");
    }
  };

  if (!inst.length)
    return (
      <AppPreloader
        background={theme.colors.background}
        color={theme.colors.textColor}
      />
    );

  return (
    <View style={container(theme.colors.background)}>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenInst(true)}
          disabled={!inst.length}
          size={Sizes.large}
        >
          {selectedInst.name}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenCourse(true)}
          disabled={
            !course.length || selectedInst.name === localise.student.course
          }
          size={Sizes.large}
        >
          {selectedCourse.name}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenGroup(true)}
          disabled={
            !group.length || selectedCourse.value === localise.student.group
          }
          size={Sizes.large}
        >
          {selectedGroup.name}
        </AppButton>
      </View>
      <SelectModal
        data={inst}
        visible={openInst}
        setVisible={setOpenInst}
        dispatchMethod={onDepartmentSelect}
      />
      <SelectModal
        data={course}
        visible={openCourse}
        setVisible={setOpenCourse}
        dispatchMethod={onCourseSelect}
      />
      <SelectModal
        data={group}
        visible={openGroup}
        setVisible={setOpenGroup}
        dispatchMethod={onGroupSelect}
      />

      {error && (
        <InternetAlert
          error={error}
          onClose={setError}
          method={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: RoutesStack.Login,
                  },
                ],
              })
            );
          }}
          offlineMode={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    margin: {
        marginBottom: 20,
    },
});

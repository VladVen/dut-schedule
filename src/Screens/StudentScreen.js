import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourse,
  getGroup,
  getInstitute,
  saveGroup,
  saveGroupName,
} from "../../redux/loginStudentReducer";
import { container } from "../../Theme";
import { SelectModal } from "../Components/SelectModal";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

export const StudentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const inst = useSelector((state) => state.login.selectData.inst);
  const course = useSelector((state) => state.login.selectData.course);
  const group = useSelector((state) => state.login.selectData.group);
  const [openInst, setOpenInst] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const [selectedInst, setSelectedInst] = useState(() => localise.student.inst);
  const [selectedCourse, setSelectedCourse] = useState(
    () => localise.student.course
  );
  const [selectedGroup, setSelectedGroup] = useState(
    () => localise.student.group
  );

  const loadInst = useCallback(
    async () => await dispatch(getInstitute()),
    [getInstitute]
  );

  useEffect(() => {
    loadInst();
  }, []);

  if (!inst)
    return (
      <View style={container(theme.colors.background)}>
        <ActivityIndicator color={theme.colors.textColor} size={"large"} />
      </View>
    );

  return (
    <View style={container(theme.colors.background)}>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenInst(true)}
          disabled={!inst.length}
          size={"l"}
        >
          {selectedInst}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenCourse(true)}
          disabled={!course.length || selectedInst === "Select your Institute"}
          size={"l"}
        >
          {selectedCourse}
        </AppButton>
      </View>
      <View style={styles.margin}>
        <AppButton
          onPress={() => setOpenGroup(true)}
          disabled={!group.length || selectedCourse === "Select your Institute"}
          size={"l"}
        >
          {selectedGroup}
        </AppButton>
      </View>
      <SelectModal
        data={inst}
        visible={openInst}
        setVisible={setOpenInst}
        setSelected={setSelectedInst}
        dispatchMethod={(val) => {
          setSelectedCourse("Select your Course");
          setSelectedGroup("Select your Group");
          dispatch(getCourse(val));
        }}
      />
      <SelectModal
        data={course}
        visible={openCourse}
        setVisible={setOpenCourse}
        setSelected={setSelectedCourse}
        dispatchMethod={(val) => {
          dispatch(getGroup(val));
        }}
      />
      <SelectModal
        data={group}
        visible={openGroup}
        setVisible={setOpenGroup}
        setSelected={(name) => {
          setSelectedGroup(name);
          dispatch(saveGroupName(name));
        }}
        dispatchMethod={(val) => {
          dispatch(saveGroup(val));
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

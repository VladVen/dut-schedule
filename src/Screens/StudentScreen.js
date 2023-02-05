import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourse,
  getGroup,
  getInstitute,
  saveGroup,
} from "../../redux/loginStudentReducer";
import { THEME } from "../../Theme";
import { SelectModal } from "../Components/SelectModal";
import { CommonActions } from "@react-navigation/native";
import AppButton from "../Components/UI/AppButton";

export const StudentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const inst = useSelector((state) => state.login.selectData.inst);
  const course = useSelector((state) => state.login.selectData.course);
  const group = useSelector((state) => state.login.selectData.group);
  const [openInst, setOpenInst] = useState(false);
  const [selectedInst, setSelectedInst] = useState("Select your Institute");
  const [openCourse, setOpenCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Select your Course");
  const [openGroup, setOpenGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("Select your Group");

  const loadInst = useCallback(
    async () => await dispatch(getInstitute()),
    [getInstitute]
  );

  useEffect(() => {
    loadInst();
  }, []);

  if (!inst)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
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
        setSelected={setSelectedGroup}
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

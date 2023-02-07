import AppHeaderButton from "./UI/AppHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { clearStudentsData } from "../../redux/loginStudentReducer";
import { clearTeachersData } from "../../redux/loginTeacherReducer";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../redux/scheduleReducer";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import AppButton from "./UI/AppButton";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

export const DayWeekHeaderButtons = ({ navigation }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.login.myData.group);
  const teacher = useSelector((state) => state.loginTeacher.myData.teacher);
  const [openMenu, setOpenMenu] = useState(false);
  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const theme = useTheme();

  const getData = useCallback(async () => {
    if (!group) {
      await dispatch(getSchedule(teacher, "teacher"));
    } else {
      await dispatch(getSchedule(group));
    }
  }, [getSchedule]);

  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
      <Item
        title={"Refresh"}
        color={theme.colors.headerText}
        iconName={"refresh"}
        onPress={() => {
          getData();
        }}
      />
      <Item
        title={"Menu"}
        color={theme.colors.headerText}
        iconName={"menu"}
        onPress={() => {
          setOpenMenu(true);
        }}
      />
      <Modal visible={openMenu} transparent>
        <Pressable style={styles.container} onPress={() => setOpenMenu(false)}>
          <View
            style={{
              ...styles.body,
              backgroundColor: theme.colors.background,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                elevation: 8,
            }}
          >
            <AppButton
              onPress={() => {
                setOpenMenu(false);
                navigation.navigate("Settings");
              }}
            >
              {localise.buttons.settings}
            </AppButton>
            <AppButton
              onPress={() => {
                setOpenMenu(false);
                dispatch(clearStudentsData());
                dispatch(clearTeachersData());
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Login",
                      },
                    ],
                  });
                }, 0);
              }}
            >
              {localise.buttons.logOut}
            </AppButton>
          </View>
        </Pressable>
      </Modal>
    </HeaderButtons>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: "15%",
  },
  body: {
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    marginRight: 5,
    height: 100,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    width: "100%",
  },
});

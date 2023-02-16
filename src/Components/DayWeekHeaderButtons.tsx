import AppHeaderButton from "./UI/AppHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import AppButton from "./UI/AppButton";
import { localisation } from "../../localisation/localisation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAppTheme } from "../../hooks/useAppTheme";
import { fetchSchedule } from "../../store/reducers/schedule/ScheduleThunk";
import { LoginSlice } from "../../store/reducers/login/loginSlice";
import { ScheduleSlice } from "../../store/reducers/schedule/scheduleSlice";
import {
  RoutesStack,
  RoutesStackParamList,
} from "../Navigation/AppNavigation.types";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core/src/types";

export const DayWeekHeaderButtons = () => {
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const { id, category } = useAppSelector((state) => state.login);

  const theme = useAppTheme();

  const navigation = useNavigation<NavigationProp<RoutesStackParamList>>();

  const { resetLogin } = LoginSlice.actions;
  const {resetSchedule, setDate } = ScheduleSlice.actions;


  const getData = useCallback(async () => {
    await dispatch(fetchSchedule({ id, category }));
    dispatch(setDate(new Date()))
  }, [fetchSchedule]);

  const onLogout = () => {
    setOpenMenu(false);
    dispatch(resetLogin());
    dispatch(resetSchedule());
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: RoutesStack.Login,
          },
        ],
      });
    }, 0);
  };

  const onSettings = () => {
    setOpenMenu(false);
    navigation.navigate(RoutesStack.Settings);
  };

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
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 8,
            }}
          >
            <AppButton onPress={onSettings}>
              {localise.buttons.settings}
            </AppButton>
            <AppButton onPress={onLogout}>{localise.buttons.logOut}</AppButton>
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

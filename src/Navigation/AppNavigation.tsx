import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../Screens/LoginScreen";
import { StudentScreen } from "../Screens/StudentScreen";
import { TeacherScreen } from "../Screens/TeacherScreen";
import { SettingsScreen } from "../Screens/SettingsScreen";
import { useMemo } from "react";
import { localisation } from "../../localisation/localisation";
import { RoutesStack, RoutesStackParamList } from "./AppNavigation.types";
import { useAppTheme } from "../../hooks/useAppTheme";
import { BottomNavigator } from "./BottomNavigation";
import { useAppSelector } from "../../hooks/redux";

const ScheduleNavigator = createNativeStackNavigator<RoutesStackParamList>();

export const AppNavigation = () => {
  const id = useAppSelector((state) => state.login.id);

  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);
  const theme = useAppTheme();
  const initialRoute = id ? RoutesStack.Footer : RoutesStack.Login;

  return (
    <NavigationContainer>
      <ScheduleNavigator.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.headerColor,
          },
          headerTintColor: theme.colors.headerText,
        }}
      >
        <ScheduleNavigator.Screen
          name={RoutesStack.Login}
          component={LoginScreen}
          options={{
            title: localise.login.header,
          }}
        />
        <ScheduleNavigator.Screen
          name={RoutesStack.Student}
          component={StudentScreen}
          options={{
            title: localise.student.header,
          }}
        />
        <ScheduleNavigator.Screen
          name={RoutesStack.Teacher}
          options={{
            title: localise.teacher.header,
          }}
          component={TeacherScreen}
        />
        <ScheduleNavigator.Screen
          name={RoutesStack.Settings}
          component={SettingsScreen}
          options={{
            headerTintColor: theme.colors.headerText,
            title: localise.settings.header,
          }}
        />
        <ScheduleNavigator.Screen
          name={RoutesStack.Footer}
          component={BottomNavigator}
          options={{ headerShown: false, title: localise.schedule }}
        />
      </ScheduleNavigator.Navigator>
    </NavigationContainer>
  );
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { useAppTheme } from "../../hooks/useAppTheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "../../hooks/redux";
import { localisation } from "../../localisation/localisation";
import { DayScreen } from "../Screens/DayScreen";
import { WeekScreen } from "../Screens/WeekScreen";

const Bottom = createBottomTabNavigator();

export const BottomNavigator = () => {
  const name = useAppSelector((state) => state.login.name);
  const lang = useAppSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);
  const theme = useAppTheme();
  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerColor,
          shadowColor: "transparent",
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        headerTintColor: theme.colors.headerText,
        tabBarStyle: {
          backgroundColor: theme.colors.headerColor,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#444242",
      }}
    >
      <Bottom.Screen
        name="Day"
        component={DayScreen}
        options={{
          tabBarLabel: localise.dayWeek.day,
          headerTitle: name?.split(" ")[0],
          tabBarIcon: (info) => (
            <FontAwesome5 name="calendar-day" size={20} color={info.color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Week"
        component={WeekScreen}
        options={{
          tabBarLabel: localise.dayWeek.week,
          headerTitle: name?.split(" ")[0],
          tabBarIcon: (info) => (
            <FontAwesome5 name="calendar-week" size={20} color={info.color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};
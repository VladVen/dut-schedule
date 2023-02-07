import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WeekScreen } from "../Screens/WeekScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../Screens/LoginScreen";
import { StudentScreen } from "../Screens/StudentScreen";
import { TeacherScreen } from "../Screens/TeacherScreen";
import { useSelector } from "react-redux";
import { DayScreen } from "../Screens/DayScreen";
import { SettingsScreen } from "../Screens/SettingsScreen";
import { useMemo } from "react";
import { localisation } from "../localisation/localisation";
import { useTheme } from "react-native-paper";

const SchedNavigator = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

function BottomNavigator() {
  const name = useSelector((state) => state.login.myData.groupName);
  const teacherName = useSelector(
    (state) => state.loginTeacher.myData.teacherName
  );
    const lang = useSelector((state) => state.settings.lang);
    const localise = useMemo(() => localisation(lang), [lang]);


  const theme = useTheme();
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
          headerTitle: name || teacherName?.split(" ")[0],
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
            headerTitle: name || teacherName?.split(" ")[0],
          tabBarIcon: (info) => (
            <FontAwesome5 name="calendar-week" size={20} color={info.color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

export const AppNavigation = () => {
  const group = useSelector((state) => state.login.myData.group);
  const teacher = useSelector((state) => state.loginTeacher.myData.teacher);

  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);
  const theme = useTheme();
  const initialRoute = group || teacher ? "Footer" : "Login";

  return (
    <NavigationContainer>
      <SchedNavigator.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.headerColor,
          },
          headerTintColor: theme.colors.headerText,
        }}
      >
        <SchedNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: localise.login.header,
          }}
        />
        <SchedNavigator.Screen
          name="Student"
          component={StudentScreen}
          options={{
            title: localise.student.header,
          }}
        />
        <SchedNavigator.Screen
          name="Teacher"
          options={{
            title: localise.teacher.header,
          }}
          component={TeacherScreen}
        />
        <SchedNavigator.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTintColor: theme.colors.headerText,
            title: localise.settings.header,
          }}
        />
        <SchedNavigator.Screen
          name="Footer"
          component={BottomNavigator}
          options={{ headerShown: false, title: localise.schedule }}
        />
      </SchedNavigator.Navigator>
    </NavigationContainer>
  );
};

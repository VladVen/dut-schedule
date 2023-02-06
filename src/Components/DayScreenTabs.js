import React, {useEffect, useMemo} from "react";
import { Text, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { Day } from "./Day";
import { TabBar, TabView } from "react-native-tab-view";
import { THEME } from "../../Theme";
import { DayWeekHeaderButtons } from "./DayWeekHeaderButtons";
import {localisation} from "../localisation/localisation";

export const DayScreenTabs = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DayWeekHeaderButtons navigation={navigation} />,
    });
  }, []);

  const schedule = useSelector((state) => state.schedule.month.currentWeek);
  const lang = useSelector((state) => state.settings.lang);
  const localise = useMemo(() => localisation(lang), [lang]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes, setRoutes] = React.useState([
    { key: "Monday", title: localise.dayWeek.daysOfWeek.mon },
    { key: "Tuesday", title: localise.dayWeek.daysOfWeek.tue },
    { key: "Wednesday", title: localise.dayWeek.daysOfWeek.wed },
    { key: "Thursday", title: localise.dayWeek.daysOfWeek.thu },
    { key: "Friday", title: localise.dayWeek.daysOfWeek.fri },
    { key: "Saturday", title: localise.dayWeek.daysOfWeek.sat },
    { key: "Sunday", title: localise.dayWeek.daysOfWeek.sun },
  ]);

  useEffect(() => {
    setRoutes([
      { key: "Monday", title: localise.dayWeek.daysOfWeek.mon },
      { key: "Tuesday", title: localise.dayWeek.daysOfWeek.tue },
      { key: "Wednesday", title: localise.dayWeek.daysOfWeek.wed },
      { key: "Thursday", title: localise.dayWeek.daysOfWeek.thu },
      { key: "Friday", title: localise.dayWeek.daysOfWeek.fri },
      { key: "Saturday", title: localise.dayWeek.daysOfWeek.sat },
      { key: "Sunday", title: localise.dayWeek.daysOfWeek.sun },
    ])
  }, [lang])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "Monday":
        return <Day schedule={schedule[0]} />;
      case "Tuesday":
        return <Day schedule={schedule[1]} />;
      case "Wednesday":
        return <Day schedule={schedule[2]} />;
      case "Thursday":
        return <Day schedule={schedule[3]} />;
      case "Friday":
        return <Day schedule={schedule[4]} />;
      case "Saturday":
        return <Day schedule={schedule[5]} />;
      case "Sunday":
        return <Day schedule={schedule[6]} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: THEME.headerColor,
      }}
      renderLabel={({ route }) => (
        <Text style={{ fontSize: 13, fontFamily: "eUkraine" }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{ backgroundColor: THEME.background }}
    />
  );
};
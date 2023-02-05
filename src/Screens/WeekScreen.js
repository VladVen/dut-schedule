import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { THEME } from "../../Theme";
import { TabBar, TabView } from "react-native-tab-view";
import { Week } from "../Components/Week";
import { DayWeekHeaderButtons } from "../Components/DayWeekHeaderButtons";

export const WeekScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DayWeekHeaderButtons navigation={navigation} />,
    });
  }, []);

  const schedule = useSelector((state) => state.schedule.month);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (
      schedule.thirdWeek[0] &&
      schedule.secondWeek[0] &&
      schedule.nextWeek[0] &&
      schedule.currentWeek[0]
    ) {
      setRoutes([
        {
          key: "Current",
          title: `${schedule.currentWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${schedule.currentWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Next",
          title: `${schedule.nextWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${schedule.nextWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Second",
          title: `${schedule.secondWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${schedule.secondWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Third",
          title: `${schedule.thirdWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${schedule.thirdWeek[6].date.slice(0, String.length - 6)}`,
        },
      ]);
    }
  }, [
    schedule.thirdWeek,
    schedule.secondWeek,
    schedule.nextWeek,
    schedule.currentWeek,
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "Current":
        return <Week schedule={schedule.currentWeek} />;
      case "Next":
        return <Week schedule={schedule.nextWeek} />;
      case "Second":
        return <Week schedule={schedule.secondWeek} />;
      case "Third":
        return <Week schedule={schedule.thirdWeek} />;
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
        <Text style={{ fontSize: 11 }}>{route.title}</Text>
      )}
    />
  );

  if (
    schedule.thirdWeek[0] &&
    schedule.secondWeek[0] &&
    schedule.nextWeek[0] &&
    schedule.currentWeek[0]
  ) {
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
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={"large"} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
  },
});

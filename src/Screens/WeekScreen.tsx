import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Week } from "../Components/Week";
import { DayWeekHeaderButtons } from "../Components/DayWeekHeaderButtons";
import { AppPreloader } from "../Components/UI/AppPreloader";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAppSelector } from "../../hooks/redux";
import AppText from "../Components/UI/AppText";
import { Sizes } from "../../types/sizes";

export const WeekScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DayWeekHeaderButtons />,
    });
  }, []);

  const theme = useAppTheme();

  const { currentWeek, nextWeek, secondWeek, thirdWeek } = useAppSelector(
    (state) => state.schedule
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = useState<number>(0);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (thirdWeek[0] && secondWeek[0] && nextWeek[0] && currentWeek[0]) {
      setRoutes([
        {
          key: "Current",
          title: `${currentWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${currentWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Next",
          title: `${nextWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${nextWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Second",
          title: `${secondWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${secondWeek[6].date.slice(0, String.length - 6)}`,
        },
        {
          key: "Third",
          title: `${thirdWeek[0].date.slice(
            0,
            String.length - 6
          )} - ${thirdWeek[6].date.slice(0, String.length - 6)}`,
        },
      ]);
    }
  }, [thirdWeek, secondWeek, nextWeek, currentWeek]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "Current":
        return <Week schedule={currentWeek} />;
      case "Next":
        return <Week schedule={nextWeek} />;
      case "Second":
        return <Week schedule={secondWeek} />;
      case "Third":
        return <Week schedule={thirdWeek} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: theme.colors.headerColor,
      }}
      renderLabel={({ route }) => (
        <AppText color={theme.colors.background} size={Sizes.small}>
          {route.title}
        </AppText>
      )}
      scrollEnabled
      layout={layout}
    />
  );

  if (thirdWeek[0] && secondWeek[0] && nextWeek[0] && currentWeek[0]) {
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: theme.colors.background }}
      />
    );
  } else {
    return (
      <AppPreloader
        background={theme.colors.background}
        color={theme.colors.textColor}
      />
    );
  }
};



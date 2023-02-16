import React, {useCallback, useEffect, useState} from "react";
import {DayScreenTabs} from "../Components/DayScreenTabs";
import {AppPreloader} from "../Components/UI/AppPreloader";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchSchedule} from "../../store/reducers/schedule/ScheduleThunk";
import {useAppTheme} from "../../hooks/useAppTheme";
import {InternetAlert} from "../Components/InternetAlert";
import {ScheduleSlice} from "../../store/reducers/schedule/scheduleSlice";
import {View} from "react-native";

export const DayScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {fetching, error, lastUpdate} = useAppSelector(
      (state) => state.schedule
  );
  const id = useAppSelector((state) => state.login.id);
  const category = useAppSelector((state) => state.login.category);
  const theme = useAppTheme();

  const {removeError, setDate} = ScheduleSlice.actions;

  const [errorModal, setErrorModal] = useState(error);

  useEffect(() => {
    setErrorModal(error);
  }, [error]);

  const getData = useCallback(async () => {
    dispatch(fetchSchedule({id, category}));
    dispatch(setDate(new Date()));
  }, [fetchSchedule]);

  useEffect(() => {
    if (!lastUpdate) {
      getData();
    } else {
      const lastPush: Date = new Date(lastUpdate);
      const now: Date = new Date();
      const diffInHours = (now.getTime() - lastPush.getTime()) / (1000 * 60 * 60);
      if(diffInHours >= 4){
        getData();
      }
    }
  }, []);

  if (fetching) {
    return (
        <AppPreloader
            background={theme.colors.background}
            color={theme.colors.textColor}
        />
    );
  }

  return (
      <>
        {error ? (
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
              <InternetAlert
                  error={errorModal}
                  onClose={setErrorModal}
                  method={() => {
                    getData();
                  }}
                  onDismiss={() => {
                    dispatch(removeError());
                  }}
              />
            </View>
        ) : (
            <DayScreenTabs navigation={navigation}/>
        )}
      </>
  );
};



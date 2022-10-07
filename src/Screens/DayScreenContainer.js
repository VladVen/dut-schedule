import React, {useCallback, useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../Theme";
import {getSchedule} from "../../redux/scheduleReducer";
import {DayScreen} from "./DayScreen";


export const DayScreenContainer = ({navigation}) => {

    const dispatch = useDispatch()
    const schedule = useSelector(state => state.schedule.month.currentWeek)
    const group = useSelector(state => state.login.myData.group)
    const teacher = useSelector(state => state.loginTeacher.myData.teacher)

    const getData = useCallback(async () => {
        if(!group) {
            await dispatch(getSchedule(teacher, 'teacher'))
        } else  {
            await dispatch(getSchedule(group))
        }
    }, [getSchedule])

    useEffect( () => {
        getData()
    }, [])


    if (!schedule.length) {
        return <View style={styles.container}>
            <ActivityIndicator color={THEME.textColor} size={'large'}/>
        </View>
    }

    return (
       <DayScreen navigation={navigation}/>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background,
    },
})


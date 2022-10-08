import {ActivityIndicator, Button, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../Theme";
import {SelectModal} from "../Custom/SelectModal";
import {getDepartment, getTeacher, saveTeacher} from "../../redux/loginTeacherReducer";
import {CommonActions} from "@react-navigation/native";


export const TeacherScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const department = useSelector(state => state.loginTeacher.selectData.department)
    const teacher = useSelector(state => state.loginTeacher.selectData.teacher)
    const [openDep, setOpenDep] = useState(false)
    const [selectedDep, setSelectedDep] = useState('Select your Department')
    const [openTeacher, setOpenTeacher] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState('Select you')


    const loadDep = useCallback(async () => await dispatch(getDepartment()), [getDepartment])

    useEffect(() => {
        loadDep()
    }, [])

    if (!department.length) return <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={'large'}/>
    </View>

    return (
        <View style={styles.container}>
            <View style={styles.margin}>
                <Button title={selectedDep} onPress={() => setOpenDep(true)} color={THEME.textColor}/>
            </View>
            <View  style={styles.margin}>
                <Button title={selectedTeacher} disabled={!teacher.length}
                        onPress={() => setOpenTeacher(true)}
                        color={THEME.textColor}/>
            </View>

            <SelectModal data={department} visible={openDep} setVisible={setOpenDep} setSelected={setSelectedDep}
                         dispatchMethod={(val) => {
                             dispatch(getTeacher(val))
                             setSelectedTeacher('Select you')
                         }}/>
            <SelectModal data={teacher} visible={openTeacher} setVisible={setOpenTeacher} setSelected={setSelectedTeacher}
                         dispatchMethod={async (val) => {
                             dispatch(saveTeacher(val))
                             navigation.dispatch(
                                 CommonActions.reset({
                                     index: 0,
                                     routes: [
                                         {
                                             name: 'Footer',
                                         },
                                     ],
                                 })
                             )
                         }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background,
    },
    margin: {
        marginBottom: 20,
    }
})


import {ActivityIndicator, Button, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCourse, getGroup, getInstitute, saveGroup} from "../../redux/loginReducer";
import {THEME} from "../../Theme";
import {SelectModal} from "../Custom/SelectModal";


export const StudentScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const inst = useSelector(state => state.login.selectData.inst)
    const course = useSelector(state => state.login.selectData.course)
    const group = useSelector(state => state.login.selectData.group)
    const [openInst, setOpenInst] = useState(false)
    const [selectedInst, setSelectedInst] = useState('Select your Institute')
    const [openCourse, setOpenCourse] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('Select your Course')
    const [openGroup, setOpenGroup] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState('Select your Course')

    const loadInst = useCallback(async () => await dispatch(getInstitute()), [getInstitute])

    useEffect(() => {
        loadInst()
    }, [])

    if (!inst) return <View style={styles.container}>
        <ActivityIndicator color={THEME.textColor} size={'large'}/>
    </View>

    return (
        <View style={styles.container}>
            <View style={styles.margin}>
                <Button title={selectedInst} onPress={() => setOpenInst(true)} color={THEME.textColor}/>
            </View>
            <View  style={styles.margin}>
                <Button title={selectedCourse} disabled={!course.length} onPress={() => setOpenCourse(true)}
                        color={THEME.textColor}/>
            </View>
            <View  style={styles.margin}>
                <Button title={selectedGroup} disabled={!group.length} onPress={() => setOpenGroup(true)}
                        color={THEME.textColor}/>
            </View>
            <SelectModal data={inst} visible={openInst} setVisible={setOpenInst} setSelected={setSelectedInst}
                         dispatchMethod={(val) => {
                             dispatch(getCourse(val))
                         }}/>
            <SelectModal data={course} visible={openCourse} setVisible={setOpenCourse} setSelected={setSelectedCourse}
                         dispatchMethod={(val) => {dispatch(getGroup(val))}}/>
            <SelectModal data={group} visible={openGroup} setVisible={setOpenGroup} setSelected={setSelectedGroup}
                         dispatchMethod={async (val) => {
                             await dispatch(saveGroup(val))
                             navigation.navigate('Footer')
                         }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgb(42,42,42)',
    },
    margin: {
        marginBottom: 20,
    }
})


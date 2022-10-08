import AppHeaderButton from "./AppHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {clearStudentsData} from "../../redux/loginStudentReducer";
import {clearTeachersData} from "../../redux/loginTeacherReducer";
import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSchedule} from "../../redux/scheduleReducer";
import {Button, Modal, Pressable, StyleSheet, View} from "react-native";
import {THEME} from "../../Theme";

export const DayWeekHeaderButtons = ({navigation}) => {

    const dispatch = useDispatch()
    const group = useSelector(state => state.login.myData.group)
    const teacher = useSelector(state => state.loginTeacher.myData.teacher)
    const [openMenu, setOpenMenu] = useState(false)

    const getData = useCallback(async () => {
        if (!group) {
            await dispatch(getSchedule(teacher, 'teacher'))
        } else {
            await dispatch(getSchedule(group))
        }
    }, [getSchedule])

    return (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
            <Item title={'Refresh'}
                  iconName={'refresh'}
                  onPress={() => {
                      getData()
                  }}
            />
            <Item title={'Menu'}
                  iconName={'menu'}
                  onPress={() => {
                      setOpenMenu(true)
                  }}
            />
            <Modal visible={openMenu} transparent={true}>
                <Pressable style={styles.container} onPress={() => setOpenMenu(false)}>
                    <View style={styles.body}>
                        <Pressable style={styles.pressable}>
                            <Button title={'Settings'}
                                    onPress={() => {

                                    }}
                            />
                        </Pressable>
                        <Pressable style={styles.pressable}>
                            <Button title={'Log out'}
                                    onPress={() => {
                                        dispatch(clearStudentsData())
                                        dispatch(clearTeachersData())
                                        navigation.navigate('Login')
                                    }}/>
                        </Pressable>
                    </View>
                </Pressable>

            </Modal>
        </HeaderButtons>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        marginTop: '15%',

    },
    body: {
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2},
        marginRight: 5,
        width: 150,
        height: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background,
    },
    pressable: {
        width: '100%'
    }
})



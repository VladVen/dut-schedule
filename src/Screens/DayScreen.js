import React, {useCallback, useEffect} from "react";
import {ActivityIndicator, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderButton from "../Custom/AppHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import {Day} from "../Components/Day";
import {TabBar, TabView} from "react-native-tab-view";
import {THEME} from "../../Theme";
import {getCurrentWeek, getNextWeek, getSecondWeek, getThirdWeek} from "../../redux/scheduleReducer";


export const DayScreen = ({navigation}) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
                    <Item title={'Menu'}
                          iconName={'menu'}
                          onPress={() => navigation.navigate('Login')}
                    />
                </HeaderButtons>
            ),
        })
    }, [])
    const dispatch = useDispatch()
    const schedule = useSelector(state => state.schedule.month)
    const group = useSelector(state => state.login.myData.group)

    const getData = useCallback(async () => {
        await dispatch(getCurrentWeek(group))
        await dispatch(getNextWeek(group))
        await dispatch(getSecondWeek(group))
        await dispatch(getThirdWeek(group))
    }, [getCurrentWeek, getNextWeek, getSecondWeek, getThirdWeek])

    useEffect(() => {
        getData()
    }, [])

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        {key: 'Monday', title: 'Mon'},
        {key: 'Tuesday', title: 'Tue'},
        {key: 'Wednesday', title: 'Wed'},
        {key: 'Thursday', title: 'Thu'},
        {key: 'Friday', title: 'Fri'},
        {key: 'Saturday', title: 'Sat'},
        {key: 'Sunday', title: 'Sun'},
    ]);


    const renderScene = ({route}) => {
        switch (route.key) {
            case 'Monday':
                return <Day schedule={schedule.currentWeek[0]}/>;
            case 'Tuesday':
                return <Day schedule={schedule.currentWeek[1]}/>;
            case 'Wednesday':
                return <Day schedule={schedule.currentWeek[2]}/>;
            case 'Thursday':
                return <Day schedule={schedule.currentWeek[3]}/>;
            case 'Friday':
                return <Day schedule={schedule.currentWeek[4]}/>;
            case 'Saturday':
                return <Day schedule={schedule.currentWeek[5]}/>;
            case 'Sunday':
                return <Day schedule={schedule.currentWeek[6]}/>;
            default:
                return null;
        }
    };
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            renderLabel={({route}) => (
                    <Text style={{fontSize: 13, fontFamily: 'eUkraine'}}>
                        {route.title}
                    </Text>
            )}
        />
    );

    if (schedule.thirdWeek[0] && schedule.secondWeek[0] &&
        schedule.nextWeek[0] && schedule.currentWeek[0]) {
        return (
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                style={{backgroundColor: THEME.background}}
            />
        );
    } else {
        return <View style={styles.container}>
            <ActivityIndicator color={THEME.textColor} size={'large'}/>
        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background,
    },
})


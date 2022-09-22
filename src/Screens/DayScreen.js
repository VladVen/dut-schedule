import React, {useEffect} from "react";
import {Text, useWindowDimensions} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderButton from "../Custom/AppHeaderButton";
import {useSelector} from "react-redux";
import {Day} from "../Components/Day";
import {TabBar, TabView} from "react-native-tab-view";
import {THEME} from "../../Theme";


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

    const schedule = useSelector(state => state.schedule.month.currentWeek)

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
                return <Day schedule={schedule[0]}/>;
            case 'Tuesday':
                return <Day schedule={schedule[1]}/>;
            case 'Wednesday':
                return <Day schedule={schedule[2]}/>;
            case 'Thursday':
                return <Day schedule={schedule[3]}/>;
            case 'Friday':
                return <Day schedule={schedule[4]}/>;
            case 'Saturday':
                return <Day schedule={schedule[5]}/>;
            case 'Sunday':
                return <Day schedule={schedule[6]}/>;
            default:
                return null;
        }
    };
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            renderLabel={({route}) => (
                    <Text style={{fontSize: 15}}>
                        {route.title}
                    </Text>
            )}
        />
    );

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

}


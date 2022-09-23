import React from "react";
import {Text, useWindowDimensions} from "react-native";
import {useSelector} from "react-redux";
import {THEME} from "../../Theme";
import {TabBar, TabView} from "react-native-tab-view";
import {Week} from "../Components/Week";


export const WeekScreen = () => {

    const schedule = useSelector(state => state.schedule.month)


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);

    const currentWeek = `${schedule.currentWeek[0].date.slice(0, String.length - 6)} - ${schedule.currentWeek[6].date.slice(0, String.length - 6)}`
    const nextWeek =  `${schedule.nextWeek[0].date.slice(0, String.length - 6)} - ${schedule.nextWeek[6].date.slice(0, String.length - 6)}`
    const secondWeek =  `${schedule.secondWeek[0].date.slice(0, String.length - 6)} - ${schedule.secondWeek[6].date.slice(0, String.length - 6)}`
    const thirdWeek = `${schedule.thirdWeek[0].date.slice(0, String.length - 6)} - ${schedule.thirdWeek[6].date.slice(0, String.length - 6)}`

    const [routes] = React.useState([
        {key: 'Current', title: currentWeek},
        {key: 'Next', title: nextWeek},
        {key: 'Second', title: secondWeek},
        {key: 'Third', title: thirdWeek},
    ]);


    const renderScene = ({route}) => {
        switch (route.key) {
            case 'Current':
                return <Week schedule={schedule.currentWeek}/>;
            case 'Next':
                return <Week schedule={schedule.nextWeek}/>;
            case 'Second':
                return <Week schedule={schedule.secondWeek}/>;
            case 'Third':
                return <Week schedule={schedule.thirdWeek}/>;
            default:
                return null;
        }
    };
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            renderLabel={({route}) => (
                <Text style={{fontSize: 12}}>
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






import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {WeekScreen} from "../Screens/WeekScreen";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "../Screens/LoginScreen";
import {StudentScreen} from "../Screens/StudentScreen";
import {TeacherScreen} from "../Screens/TeacherScreen";
import {useSelector} from "react-redux";
import {DayScreenContainer} from "../Screens/DayScreenContainer";
import {THEME} from "../../Theme";


const SchedNavigator = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();


function BottomNavigator() {
    return (
        <Bottom.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: THEME.headerColor,
                shadowOffset: {
                    width: 0, height: 0
                },
            },
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: THEME.headerColor,
                color: '#fff'
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#757575',
            tabBarLabelStyle: {
                color: '#fff'
            }
        }}>
            <Bottom.Screen name="Day" component={DayScreenContainer}
                           options={{
                               tabBarIcon: (info) => (
                                   <Ionicons name="ios-today"
                                             size={24}
                                             color={info.color}/>),
                           }}
            />
            <Bottom.Screen name="Week" component={WeekScreen}
                           options={{
                               tabBarIcon: (info) => (<Ionicons name="star" size={24}
                                                                color={info.color}/>),
                           }}
            />
        </Bottom.Navigator>
    );
}


export const AppNavigation = () => {
    const group = useSelector(state => state.login.myData.group)
    const teacher = useSelector(state => state.loginTeacher.myData.teacher)

    const initialRoute = group || teacher ? "Footer" : "Login"

    return (
        <NavigationContainer>
            <SchedNavigator.Navigator initialRouteName={initialRoute} screenOptions={{
                headerStyle: {
                    backgroundColor: THEME.headerColor,
                },
                headerTintColor: 'white'
            }}>

                <SchedNavigator.Screen name="Login" component={LoginScreen}
                                       options={{
                                           title: 'Choose your side'
                                       }}
                />
                <SchedNavigator.Screen name="Student" component={StudentScreen}/>
                <SchedNavigator.Screen name="Teacher" component={TeacherScreen}/>
                <SchedNavigator.Screen
                    name="Footer"
                    component={BottomNavigator}
                    options={{headerShown: false}}
                />
            </SchedNavigator.Navigator>
        </NavigationContainer>
    );
}

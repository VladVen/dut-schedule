import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DayScreen} from "../Screens/DayScreen";
import {WeekScreen} from "../Screens/WeekScreen";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "../Screens/LoginScreen";
import {THEME} from "../../Theme";
import {StudentScreen} from "../Screens/StudentScreen";
import {TeacherScreen} from "../Screens/TeacherScreen";


const SchedNavigator = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

//screenOptions={{
//...screenOptions,
        //     tabBarShowLabel: false,
        //   tabBarStyle: {
        //   position: 'absolute',
            //      backgroundColor:'#fff',
            //        height: 40,
            //      borderTopStartRadius: 10,
        //         borderTopEndRadius: 10,
            // },
    // tabBarActiveTintColor:Theme.MAIN_COLOR,
//}}


function BottomNavigator() {
    return (
        <Bottom.Navigator>
            <Bottom.Screen name="Day" component={DayScreen}
                        options={{
                            tabBarIcon: (info) => (<Ionicons name="albums" size={24}
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




export const AppNavigation = (props) => {

    return (
        <NavigationContainer>
        <SchedNavigator.Navigator initialRouteName={'Login'} screenOptions={{ headerStyle: {
                backgroundColor: 'rgb(2,138,124)',
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
                component={ BottomNavigator}
                options={{headerShown: false}}
            />
        </SchedNavigator.Navigator>
        </NavigationContainer>
    );
}

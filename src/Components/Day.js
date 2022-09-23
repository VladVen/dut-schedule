import {ScrollView, StyleSheet, Text, View} from "react-native";
import {THEME} from "../../Theme";
import {Lesson} from "./Lesson";


export const Day = ({schedule}) => {


    return (
        <View style={styles.container}>

            <Text style={styles.date}>
                {schedule.date}
            </Text>

            <ScrollView>
                {
                    schedule.info.map((subj, index) => <Lesson lesson={`${subj.subject.split("<br>").join("\n")}`}
                                                               time={subj.time}
                                                               key={index}
                    />)
                }
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10
    },
    date: {
        fontFamily: 'eUkraine',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: THEME.textColor
    }
})
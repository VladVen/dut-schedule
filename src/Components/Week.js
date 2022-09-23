import {ScrollView, StyleSheet} from "react-native";
import {THEME} from "../../Theme";
import {Day} from "./Day";


export const Week = ({schedule}) => {
    return(
        <ScrollView style={styles.container}>
            {
                schedule.map((item, index) => <Day schedule={item} key={index}/>)
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME.background,
    },
})
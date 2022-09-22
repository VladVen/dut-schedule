import {StyleSheet, Text, View} from "react-native";
import {THEME} from "../../Theme";


export const Lesson = ({lesson, time}) => {
    if (!lesson) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={{flex: 1, color: THEME.textColor}}>
                {lesson.slice(0, lesson.length - 29)}
            </Text>
            <Text style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
                color: THEME.textColor,
                fontSize: 18
            }}>
                {time}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        height: 200,
        alignItems: "flex-start",
        paddingLeft: 5,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'black',
        elevation: 8,
        borderRadius: 10
    }
})
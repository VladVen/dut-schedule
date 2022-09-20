import {Button, StyleSheet, Text, View} from "react-native";
import {THEME} from "../../Theme";
import React from "react";


export const TeacherScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Teacher</Text>
            <Button title={'Enter'} color={THEME.textColor} onPress={() => navigation.navigate('Footer')} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.background
    },

})
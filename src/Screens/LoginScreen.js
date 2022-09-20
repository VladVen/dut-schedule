import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {THEME} from "../../Theme";


export const LoginScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.margin}><Button title={'Student'} color={THEME.textColor} onPress={() => navigation.navigate('Student')}/></View>
            <View><Button title={'Teacher'} color={THEME.textColor} onPress={() => navigation.navigate('Teacher')} /></View>


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
    margin: {
        marginBottom: 20
    }
})
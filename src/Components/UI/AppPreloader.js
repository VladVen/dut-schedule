import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {container} from "../../../Theme";

export const AppPreloader = ({background, color}) => {
    return (
        <View style={container(background)}>
            <ActivityIndicator color={color} size={"large"} />
        </View>
    );
};
